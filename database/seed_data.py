import json
import uuid
from datetime import datetime, timedelta
import random

# Generate realistic merchant
merchant_id = str(uuid.uuid4())
merchant_sql = f"""
INSERT INTO merchants (id, name, email) VALUES 
('{merchant_id}', 'Example D2C Store', 'admin@exampled2c.com');
"""

def generate_timestamp(days_ago):
    dt = datetime.now() - timedelta(days=days_ago)
    return dt.strftime('%Y-%m-%d %H:%M:%S+00')

def generate_case(index, expected_decision):
    payment_id = str(uuid.uuid4())
    dispute_id = str(uuid.uuid4())
    order_id = f"ORD-{1000 + index}"
    customer_id = f"CUST-{5000 + index}"
    amount = random.randint(1500, 85000) * 100 # paise
    razorpay_pay_id = f"pay_{uuid.uuid4().hex[:14]}"
    razorpay_disp_id = f"disp_{uuid.uuid4().hex[:14]}"
    
    # Base Timestamps
    created_days_ago = random.randint(10, 30)
    created_at = generate_timestamp(created_days_ago)
    respond_by = generate_timestamp(created_days_ago - 7)
    
    sql_statements = []
    
    # 1. Payment
    sql_statements.append(f"""
    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('{payment_id}', '{razorpay_pay_id}', {amount}, 'INR', 'card', 'customer{index}@email.com', '9876543210', 'captured', '{created_at}');
    """)
    
    # 2. Dispute
    reason_code = "product_not_received" if random.random() > 0.3 else "order_never_shipped"
    sql_statements.append(f"""
    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('{dispute_id}', '{razorpay_disp_id}', '{payment_id}', {amount}, 'INR', '{reason_code}', 'open', '{respond_by}', 'chargeback', '{created_at}');
    """)
    
    # 3. Order
    sql_statements.append(f"""
    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('{order_id}', '{payment_id}', '{customer_id}', 'Premium Widget {index}', {amount}, 'processed', '{created_at}');
    """)
    
    # Ground Truth Decision Logic & Data generation
    tracking_id = f"TRK-{uuid.uuid4().hex[:8].upper()}"
    shipped_at = generate_timestamp(created_days_ago - 1)
    delivered_at = generate_timestamp(created_days_ago - 4)
    
    if expected_decision == "FIGHT":
        # Delivered, customer acknowledged, tracking exists
        sql_statements.append(f"""
        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('{order_id}', '{tracking_id}', 'delivered', '{shipped_at}', '{delivered_at}', 'Customer', 'Front Porch');
        """)
        msg = "I received the item but it is not what I expected." if reason_code == "product_not_received" else "Thanks for delivery."
        sql_statements.append(f"""
        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('{customer_id}', '{order_id}', 'email', '{msg}', '{delivered_at}');
        """)
        
    elif expected_decision == "ACCEPT":
        # Never shipped or lost in transit
        sql_statements.append(f"""
        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('{order_id}', '{tracking_id}', 'lost_in_transit', '{shipped_at}');
        """)
        sql_statements.append(f"""
        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('{customer_id}', '{order_id}', 'support_ticket', 'Where is my order? It has been 3 weeks.', '{generate_timestamp(created_days_ago - 5)}');
        """)
        
    elif expected_decision == "HUMAN_REVIEW":
        # Conflicting records (Delivery says delivered, customer angrily says not)
        sql_statements.append(f"""
        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('{order_id}', '{tracking_id}', 'delivered', '{shipped_at}', '{delivered_at}', 'Unknown Neighbor');
        """)
        sql_statements.append(f"""
        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('{customer_id}', '{order_id}', 'chat', 'I never received my package, who is Unknown Neighbor?!', '{generate_timestamp(created_days_ago - 3)}');
        """)
        
    # Pre-create the investigation for benchmarking ground truth mapping
    # This simulates that an investigation has a 'ground_truth_decision' for scoring later.
    # The actual 'decision' will be filled by AI during the demo/benchmark run.
    sql_statements.append(f"""
    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('{dispute_id}', 'PENDING', '{expected_decision}');
    """)

    return "\n".join(sql_statements)

def main():
    print("Generating seed data...")
    decisions = ["FIGHT"] * 20 + ["ACCEPT"] * 15 + ["HUMAN_REVIEW"] * 15
    random.shuffle(decisions)
    
    with open("database/seed.sql", "w") as f:
        f.write("-- RepresentAI Synthetic Seed Data\n")
        f.write(merchant_sql + "\n")
        
        for i, decision in enumerate(decisions):
            f.write(f"-- Case {i+1}: Expected {decision}\n")
            case_sql = generate_case(i, decision)
            f.write(case_sql + "\n")
            
    print("Seed data generated at database/seed.sql")

if __name__ == "__main__":
    main()
