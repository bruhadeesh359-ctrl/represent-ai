-- RepresentAI Synthetic Seed Data

INSERT INTO merchants (id, name, email) VALUES 
('46082624-53f7-4f83-8c47-f3c890f630e8', 'Example D2C Store', 'admin@exampled2c.com');

-- Case 1: Expected ACCEPT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('066d48ad-e56e-4796-b72f-054e978bcc0f', 'pay_dd80bcb457b146', 7947400, 'INR', 'card', 'customer0@email.com', '9876543210', 'captured', '2026-08-03 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('c719a419-a969-4044-b436-edd646966675', 'disp_061cf003c45f48', '066d48ad-e56e-4796-b72f-054e978bcc0f', 7947400, 'INR', 'product_not_received', 'open', '2026-08-10 17:19:12+00', 'chargeback', '2026-08-03 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1000', '066d48ad-e56e-4796-b72f-054e978bcc0f', 'CUST-5000', 'Premium Widget 0', 7947400, 'processed', '2026-08-03 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('ORD-1000', 'TRK-E804C9A8', 'lost_in_transit', '2026-08-04 17:19:12+00');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5000', 'ORD-1000', 'support_ticket', 'Where is my order? It has been 3 weeks.', '2026-08-08 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('c719a419-a969-4044-b436-edd646966675', 'PENDING', 'ACCEPT');
    
-- Case 2: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('14886847-08f7-4b0d-85ce-c694733b6c89', 'pay_bf83e14b09eb44', 6246000, 'INR', 'card', 'customer1@email.com', '9876543210', 'captured', '2026-08-12 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('316b02ba-72cf-4b7b-a947-e2a18f924681', 'disp_2be12b0e48024a', '14886847-08f7-4b0d-85ce-c694733b6c89', 6246000, 'INR', 'product_not_received', 'open', '2026-08-19 17:19:12+00', 'chargeback', '2026-08-12 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1001', '14886847-08f7-4b0d-85ce-c694733b6c89', 'CUST-5001', 'Premium Widget 1', 6246000, 'processed', '2026-08-12 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1001', 'TRK-CB1FF33A', 'delivered', '2026-08-13 17:19:12+00', '2026-08-16 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5001', 'ORD-1001', 'email', 'I received the item but it is not what I expected.', '2026-08-16 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('316b02ba-72cf-4b7b-a947-e2a18f924681', 'PENDING', 'FIGHT');
    
-- Case 3: Expected HUMAN_REVIEW

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('4f0952fe-7d95-4495-bc8b-397ec328f9ae', 'pay_c95ee0a20f3e43', 5269900, 'INR', 'card', 'customer2@email.com', '9876543210', 'captured', '2026-08-12 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('1491052a-0f6b-4fb0-a84b-ee75078d5231', 'disp_4300e98ea7f646', '4f0952fe-7d95-4495-bc8b-397ec328f9ae', 5269900, 'INR', 'order_never_shipped', 'open', '2026-08-19 17:19:12+00', 'chargeback', '2026-08-12 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1002', '4f0952fe-7d95-4495-bc8b-397ec328f9ae', 'CUST-5002', 'Premium Widget 2', 5269900, 'processed', '2026-08-12 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('ORD-1002', 'TRK-21F55B0D', 'delivered', '2026-08-13 17:19:12+00', '2026-08-16 17:19:12+00', 'Unknown Neighbor');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5002', 'ORD-1002', 'chat', 'I never received my package, who is Unknown Neighbor?!', '2026-08-15 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('1491052a-0f6b-4fb0-a84b-ee75078d5231', 'PENDING', 'HUMAN_REVIEW');
    
-- Case 4: Expected ACCEPT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('9f77c0b6-0c00-4bd7-a50e-a86513c1da94', 'pay_7fd4f6fc437945', 4715500, 'INR', 'card', 'customer3@email.com', '9876543210', 'captured', '2026-08-09 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('8ff0d99b-6de6-42f9-9fbc-c20fa1226195', 'disp_9ce15fb360b249', '9f77c0b6-0c00-4bd7-a50e-a86513c1da94', 4715500, 'INR', 'product_not_received', 'open', '2026-08-16 17:19:12+00', 'chargeback', '2026-08-09 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1003', '9f77c0b6-0c00-4bd7-a50e-a86513c1da94', 'CUST-5003', 'Premium Widget 3', 4715500, 'processed', '2026-08-09 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('ORD-1003', 'TRK-46907535', 'lost_in_transit', '2026-08-10 17:19:12+00');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5003', 'ORD-1003', 'support_ticket', 'Where is my order? It has been 3 weeks.', '2026-08-14 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('8ff0d99b-6de6-42f9-9fbc-c20fa1226195', 'PENDING', 'ACCEPT');
    
-- Case 5: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('0e5288fc-5f5d-4a46-8b7a-1178d82ce4b9', 'pay_0aaa8bc629df46', 6934100, 'INR', 'card', 'customer4@email.com', '9876543210', 'captured', '2026-08-14 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('83a79021-4af7-41ca-b3cd-b569acd10f3f', 'disp_6f1251901c7a47', '0e5288fc-5f5d-4a46-8b7a-1178d82ce4b9', 6934100, 'INR', 'product_not_received', 'open', '2026-08-21 17:19:12+00', 'chargeback', '2026-08-14 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1004', '0e5288fc-5f5d-4a46-8b7a-1178d82ce4b9', 'CUST-5004', 'Premium Widget 4', 6934100, 'processed', '2026-08-14 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1004', 'TRK-68F841B5', 'delivered', '2026-08-15 17:19:12+00', '2026-08-18 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5004', 'ORD-1004', 'email', 'I received the item but it is not what I expected.', '2026-08-18 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('83a79021-4af7-41ca-b3cd-b569acd10f3f', 'PENDING', 'FIGHT');
    
-- Case 6: Expected ACCEPT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('c843faeb-0b46-47ce-a2bf-6430b3ea0e32', 'pay_b30cdbdee16342', 4415600, 'INR', 'card', 'customer5@email.com', '9876543210', 'captured', '2026-08-20 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('ae51ae40-d2f8-4f57-a1e7-b0f4685362e8', 'disp_32426c29eedf41', 'c843faeb-0b46-47ce-a2bf-6430b3ea0e32', 4415600, 'INR', 'product_not_received', 'open', '2026-08-27 17:19:12+00', 'chargeback', '2026-08-20 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1005', 'c843faeb-0b46-47ce-a2bf-6430b3ea0e32', 'CUST-5005', 'Premium Widget 5', 4415600, 'processed', '2026-08-20 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('ORD-1005', 'TRK-9E27B441', 'lost_in_transit', '2026-08-21 17:19:12+00');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5005', 'ORD-1005', 'support_ticket', 'Where is my order? It has been 3 weeks.', '2026-08-25 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('ae51ae40-d2f8-4f57-a1e7-b0f4685362e8', 'PENDING', 'ACCEPT');
    
-- Case 7: Expected ACCEPT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('389a5296-dcfa-4a7d-9b8d-574a33b5f753', 'pay_3d05a430d9b242', 6043700, 'INR', 'card', 'customer6@email.com', '9876543210', 'captured', '2026-08-09 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('3ecd7749-928d-4c3f-9cd0-5c6bc583312a', 'disp_178c99bb83dc48', '389a5296-dcfa-4a7d-9b8d-574a33b5f753', 6043700, 'INR', 'order_never_shipped', 'open', '2026-08-16 17:19:12+00', 'chargeback', '2026-08-09 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1006', '389a5296-dcfa-4a7d-9b8d-574a33b5f753', 'CUST-5006', 'Premium Widget 6', 6043700, 'processed', '2026-08-09 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('ORD-1006', 'TRK-430CB287', 'lost_in_transit', '2026-08-10 17:19:12+00');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5006', 'ORD-1006', 'support_ticket', 'Where is my order? It has been 3 weeks.', '2026-08-14 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('3ecd7749-928d-4c3f-9cd0-5c6bc583312a', 'PENDING', 'ACCEPT');
    
-- Case 8: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('2d6ecd70-cf6f-4a0e-89f0-e5844ff14f29', 'pay_bc821cc5065d41', 8156900, 'INR', 'card', 'customer7@email.com', '9876543210', 'captured', '2026-08-06 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('e6e15cc7-e6fb-45f1-b5fe-b12066103755', 'disp_453c1ee8019f45', '2d6ecd70-cf6f-4a0e-89f0-e5844ff14f29', 8156900, 'INR', 'product_not_received', 'open', '2026-08-13 17:19:12+00', 'chargeback', '2026-08-06 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1007', '2d6ecd70-cf6f-4a0e-89f0-e5844ff14f29', 'CUST-5007', 'Premium Widget 7', 8156900, 'processed', '2026-08-06 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1007', 'TRK-2CC91A60', 'delivered', '2026-08-07 17:19:12+00', '2026-08-10 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5007', 'ORD-1007', 'email', 'I received the item but it is not what I expected.', '2026-08-10 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('e6e15cc7-e6fb-45f1-b5fe-b12066103755', 'PENDING', 'FIGHT');
    
-- Case 9: Expected HUMAN_REVIEW

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('44fc8e09-1d0e-486f-b6a3-58b2c7b9ab7f', 'pay_d3175e5feae14c', 3878700, 'INR', 'card', 'customer8@email.com', '9876543210', 'captured', '2026-08-15 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('5e352bfb-bdd4-4e70-be69-3d711be43a37', 'disp_64b58f4ea28f41', '44fc8e09-1d0e-486f-b6a3-58b2c7b9ab7f', 3878700, 'INR', 'product_not_received', 'open', '2026-08-22 17:19:12+00', 'chargeback', '2026-08-15 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1008', '44fc8e09-1d0e-486f-b6a3-58b2c7b9ab7f', 'CUST-5008', 'Premium Widget 8', 3878700, 'processed', '2026-08-15 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('ORD-1008', 'TRK-BA452F74', 'delivered', '2026-08-16 17:19:12+00', '2026-08-19 17:19:12+00', 'Unknown Neighbor');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5008', 'ORD-1008', 'chat', 'I never received my package, who is Unknown Neighbor?!', '2026-08-18 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('5e352bfb-bdd4-4e70-be69-3d711be43a37', 'PENDING', 'HUMAN_REVIEW');
    
-- Case 10: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('7d42cb08-f9c8-4dcd-a454-8b2419c5e64d', 'pay_f3cb236e2da148', 7432300, 'INR', 'card', 'customer9@email.com', '9876543210', 'captured', '2026-08-17 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('25e7448a-ebe1-4900-9232-f12a4e5543ba', 'disp_7391454bdcf54b', '7d42cb08-f9c8-4dcd-a454-8b2419c5e64d', 7432300, 'INR', 'order_never_shipped', 'open', '2026-08-24 17:19:12+00', 'chargeback', '2026-08-17 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1009', '7d42cb08-f9c8-4dcd-a454-8b2419c5e64d', 'CUST-5009', 'Premium Widget 9', 7432300, 'processed', '2026-08-17 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1009', 'TRK-89A47075', 'delivered', '2026-08-18 17:19:12+00', '2026-08-21 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5009', 'ORD-1009', 'email', 'Thanks for delivery.', '2026-08-21 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('25e7448a-ebe1-4900-9232-f12a4e5543ba', 'PENDING', 'FIGHT');
    
-- Case 11: Expected HUMAN_REVIEW

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('80b39038-c7ca-4765-aa4e-548946216729', 'pay_4a0c7760018d4e', 8336900, 'INR', 'card', 'customer10@email.com', '9876543210', 'captured', '2026-08-06 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('fd2d6631-eb54-4693-8da4-ddafb0f68849', 'disp_31c2cbda11c049', '80b39038-c7ca-4765-aa4e-548946216729', 8336900, 'INR', 'order_never_shipped', 'open', '2026-08-13 17:19:12+00', 'chargeback', '2026-08-06 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1010', '80b39038-c7ca-4765-aa4e-548946216729', 'CUST-5010', 'Premium Widget 10', 8336900, 'processed', '2026-08-06 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('ORD-1010', 'TRK-932DCCAA', 'delivered', '2026-08-07 17:19:12+00', '2026-08-10 17:19:12+00', 'Unknown Neighbor');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5010', 'ORD-1010', 'chat', 'I never received my package, who is Unknown Neighbor?!', '2026-08-09 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('fd2d6631-eb54-4693-8da4-ddafb0f68849', 'PENDING', 'HUMAN_REVIEW');
    
-- Case 12: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('57186ee6-2a5f-457b-979a-ffe51bb7281c', 'pay_019b0ec80d694d', 2120500, 'INR', 'card', 'customer11@email.com', '9876543210', 'captured', '2026-08-19 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('640b6647-5d52-4599-8685-0cb7060fa4ce', 'disp_372cb828810c44', '57186ee6-2a5f-457b-979a-ffe51bb7281c', 2120500, 'INR', 'order_never_shipped', 'open', '2026-08-26 17:19:12+00', 'chargeback', '2026-08-19 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1011', '57186ee6-2a5f-457b-979a-ffe51bb7281c', 'CUST-5011', 'Premium Widget 11', 2120500, 'processed', '2026-08-19 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1011', 'TRK-344BA2E6', 'delivered', '2026-08-20 17:19:12+00', '2026-08-23 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5011', 'ORD-1011', 'email', 'Thanks for delivery.', '2026-08-23 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('640b6647-5d52-4599-8685-0cb7060fa4ce', 'PENDING', 'FIGHT');
    
-- Case 13: Expected HUMAN_REVIEW

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('91d07180-5a01-439d-8dda-83d6a620969c', 'pay_ef572275591e44', 3334000, 'INR', 'card', 'customer12@email.com', '9876543210', 'captured', '2026-08-16 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('5475c594-46d7-421a-b338-b1261cc5df37', 'disp_509554dfa78944', '91d07180-5a01-439d-8dda-83d6a620969c', 3334000, 'INR', 'order_never_shipped', 'open', '2026-08-23 17:19:12+00', 'chargeback', '2026-08-16 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1012', '91d07180-5a01-439d-8dda-83d6a620969c', 'CUST-5012', 'Premium Widget 12', 3334000, 'processed', '2026-08-16 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('ORD-1012', 'TRK-F4DB3054', 'delivered', '2026-08-17 17:19:12+00', '2026-08-20 17:19:12+00', 'Unknown Neighbor');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5012', 'ORD-1012', 'chat', 'I never received my package, who is Unknown Neighbor?!', '2026-08-19 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('5475c594-46d7-421a-b338-b1261cc5df37', 'PENDING', 'HUMAN_REVIEW');
    
-- Case 14: Expected HUMAN_REVIEW

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('59d53b78-1047-42c1-ad25-769dddf4c5ef', 'pay_d9fcf7ffdcff43', 5873600, 'INR', 'card', 'customer13@email.com', '9876543210', 'captured', '2026-08-02 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('f3ec36a4-cc54-4211-af70-d159ef18df25', 'disp_e0bf55a9a49e4e', '59d53b78-1047-42c1-ad25-769dddf4c5ef', 5873600, 'INR', 'product_not_received', 'open', '2026-08-09 17:19:12+00', 'chargeback', '2026-08-02 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1013', '59d53b78-1047-42c1-ad25-769dddf4c5ef', 'CUST-5013', 'Premium Widget 13', 5873600, 'processed', '2026-08-02 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('ORD-1013', 'TRK-F75A0F5C', 'delivered', '2026-08-03 17:19:12+00', '2026-08-06 17:19:12+00', 'Unknown Neighbor');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5013', 'ORD-1013', 'chat', 'I never received my package, who is Unknown Neighbor?!', '2026-08-05 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('f3ec36a4-cc54-4211-af70-d159ef18df25', 'PENDING', 'HUMAN_REVIEW');
    
-- Case 15: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('4d33afbd-b8e9-489a-8a93-3c1223655ae4', 'pay_a4da9a962e8f48', 7925800, 'INR', 'card', 'customer14@email.com', '9876543210', 'captured', '2026-08-02 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('88cdc867-c643-4979-a99e-38fc3b0936c6', 'disp_779014d2c1e248', '4d33afbd-b8e9-489a-8a93-3c1223655ae4', 7925800, 'INR', 'order_never_shipped', 'open', '2026-08-09 17:19:12+00', 'chargeback', '2026-08-02 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1014', '4d33afbd-b8e9-489a-8a93-3c1223655ae4', 'CUST-5014', 'Premium Widget 14', 7925800, 'processed', '2026-08-02 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1014', 'TRK-E7C1FAF3', 'delivered', '2026-08-03 17:19:12+00', '2026-08-06 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5014', 'ORD-1014', 'email', 'Thanks for delivery.', '2026-08-06 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('88cdc867-c643-4979-a99e-38fc3b0936c6', 'PENDING', 'FIGHT');
    
-- Case 16: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('a9dceeda-c9e0-4ad1-ac70-c9d9f730e4d0', 'pay_cc3e310b22bf4a', 5749700, 'INR', 'card', 'customer15@email.com', '9876543210', 'captured', '2026-08-18 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('a014838b-52d2-4f17-ac5b-d18219762b19', 'disp_4d05df473c194c', 'a9dceeda-c9e0-4ad1-ac70-c9d9f730e4d0', 5749700, 'INR', 'product_not_received', 'open', '2026-08-25 17:19:12+00', 'chargeback', '2026-08-18 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1015', 'a9dceeda-c9e0-4ad1-ac70-c9d9f730e4d0', 'CUST-5015', 'Premium Widget 15', 5749700, 'processed', '2026-08-18 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1015', 'TRK-6E73B7B8', 'delivered', '2026-08-19 17:19:12+00', '2026-08-22 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5015', 'ORD-1015', 'email', 'I received the item but it is not what I expected.', '2026-08-22 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('a014838b-52d2-4f17-ac5b-d18219762b19', 'PENDING', 'FIGHT');
    
-- Case 17: Expected HUMAN_REVIEW

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('ffc488d6-c998-4f76-ab28-0236931c690c', 'pay_74f293ae5b0a4b', 7599600, 'INR', 'card', 'customer16@email.com', '9876543210', 'captured', '2026-08-05 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('4b36d182-02b5-4e32-9b30-f7aef9b1234f', 'disp_de3359c59a9644', 'ffc488d6-c998-4f76-ab28-0236931c690c', 7599600, 'INR', 'order_never_shipped', 'open', '2026-08-12 17:19:12+00', 'chargeback', '2026-08-05 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1016', 'ffc488d6-c998-4f76-ab28-0236931c690c', 'CUST-5016', 'Premium Widget 16', 7599600, 'processed', '2026-08-05 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('ORD-1016', 'TRK-97E50C56', 'delivered', '2026-08-06 17:19:12+00', '2026-08-09 17:19:12+00', 'Unknown Neighbor');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5016', 'ORD-1016', 'chat', 'I never received my package, who is Unknown Neighbor?!', '2026-08-08 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('4b36d182-02b5-4e32-9b30-f7aef9b1234f', 'PENDING', 'HUMAN_REVIEW');
    
-- Case 18: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('0d5d5d78-ef2b-429b-8ebd-5a78514a2002', 'pay_c8c0bbb457474a', 4962700, 'INR', 'card', 'customer17@email.com', '9876543210', 'captured', '2026-08-17 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('475e3211-2fa8-444f-954d-e143a453537b', 'disp_8aa0dce7c7fd42', '0d5d5d78-ef2b-429b-8ebd-5a78514a2002', 4962700, 'INR', 'order_never_shipped', 'open', '2026-08-24 17:19:12+00', 'chargeback', '2026-08-17 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1017', '0d5d5d78-ef2b-429b-8ebd-5a78514a2002', 'CUST-5017', 'Premium Widget 17', 4962700, 'processed', '2026-08-17 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1017', 'TRK-53F95E2F', 'delivered', '2026-08-18 17:19:12+00', '2026-08-21 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5017', 'ORD-1017', 'email', 'Thanks for delivery.', '2026-08-21 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('475e3211-2fa8-444f-954d-e143a453537b', 'PENDING', 'FIGHT');
    
-- Case 19: Expected ACCEPT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('60ca3dfa-1371-402f-9a0d-2637259d603b', 'pay_51a15176fad943', 3622100, 'INR', 'card', 'customer18@email.com', '9876543210', 'captured', '2026-08-01 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('c1cfdfcd-dd61-4e04-ab5b-1e844992f0c2', 'disp_7a036e27c5ec42', '60ca3dfa-1371-402f-9a0d-2637259d603b', 3622100, 'INR', 'product_not_received', 'open', '2026-08-08 17:19:12+00', 'chargeback', '2026-08-01 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1018', '60ca3dfa-1371-402f-9a0d-2637259d603b', 'CUST-5018', 'Premium Widget 18', 3622100, 'processed', '2026-08-01 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('ORD-1018', 'TRK-CD13192E', 'lost_in_transit', '2026-08-02 17:19:12+00');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5018', 'ORD-1018', 'support_ticket', 'Where is my order? It has been 3 weeks.', '2026-08-06 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('c1cfdfcd-dd61-4e04-ab5b-1e844992f0c2', 'PENDING', 'ACCEPT');
    
-- Case 20: Expected HUMAN_REVIEW

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('0135f737-f365-40b1-9e89-6cfc0ad3d247', 'pay_3411441e72a04c', 2486500, 'INR', 'card', 'customer19@email.com', '9876543210', 'captured', '2026-08-04 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('9af5cb3a-f77f-4568-95d9-fad329847239', 'disp_24b92d69b9834f', '0135f737-f365-40b1-9e89-6cfc0ad3d247', 2486500, 'INR', 'product_not_received', 'open', '2026-08-11 17:19:12+00', 'chargeback', '2026-08-04 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1019', '0135f737-f365-40b1-9e89-6cfc0ad3d247', 'CUST-5019', 'Premium Widget 19', 2486500, 'processed', '2026-08-04 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('ORD-1019', 'TRK-D2B31FF3', 'delivered', '2026-08-05 17:19:12+00', '2026-08-08 17:19:12+00', 'Unknown Neighbor');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5019', 'ORD-1019', 'chat', 'I never received my package, who is Unknown Neighbor?!', '2026-08-07 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('9af5cb3a-f77f-4568-95d9-fad329847239', 'PENDING', 'HUMAN_REVIEW');
    
-- Case 21: Expected HUMAN_REVIEW

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('2fe024f3-26d5-4399-b9d4-4b649ee2ee71', 'pay_4abe425013bb4c', 505700, 'INR', 'card', 'customer20@email.com', '9876543210', 'captured', '2026-08-01 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('73181e74-e217-4915-9e67-3884e5353e2e', 'disp_bf97de42307543', '2fe024f3-26d5-4399-b9d4-4b649ee2ee71', 505700, 'INR', 'product_not_received', 'open', '2026-08-08 17:19:12+00', 'chargeback', '2026-08-01 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1020', '2fe024f3-26d5-4399-b9d4-4b649ee2ee71', 'CUST-5020', 'Premium Widget 20', 505700, 'processed', '2026-08-01 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('ORD-1020', 'TRK-E8CAF736', 'delivered', '2026-08-02 17:19:12+00', '2026-08-05 17:19:12+00', 'Unknown Neighbor');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5020', 'ORD-1020', 'chat', 'I never received my package, who is Unknown Neighbor?!', '2026-08-04 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('73181e74-e217-4915-9e67-3884e5353e2e', 'PENDING', 'HUMAN_REVIEW');
    
-- Case 22: Expected ACCEPT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('c00d4455-ea23-4024-ac06-f9ff2d94185c', 'pay_b00d920a0b774d', 1691500, 'INR', 'card', 'customer21@email.com', '9876543210', 'captured', '2026-08-17 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('3ec902ca-6589-43e4-801d-fbd7843dcd3b', 'disp_c768a7d54b244f', 'c00d4455-ea23-4024-ac06-f9ff2d94185c', 1691500, 'INR', 'product_not_received', 'open', '2026-08-24 17:19:12+00', 'chargeback', '2026-08-17 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1021', 'c00d4455-ea23-4024-ac06-f9ff2d94185c', 'CUST-5021', 'Premium Widget 21', 1691500, 'processed', '2026-08-17 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('ORD-1021', 'TRK-E0FDBE3D', 'lost_in_transit', '2026-08-18 17:19:12+00');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5021', 'ORD-1021', 'support_ticket', 'Where is my order? It has been 3 weeks.', '2026-08-22 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('3ec902ca-6589-43e4-801d-fbd7843dcd3b', 'PENDING', 'ACCEPT');
    
-- Case 23: Expected ACCEPT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('739a3aab-d552-4ac8-b72f-a2eefc72591f', 'pay_b8951075c74b41', 707300, 'INR', 'card', 'customer22@email.com', '9876543210', 'captured', '2026-08-03 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('f04792bd-1aca-4f8f-ae41-b1d439f1dfbd', 'disp_8eedccbe04734e', '739a3aab-d552-4ac8-b72f-a2eefc72591f', 707300, 'INR', 'product_not_received', 'open', '2026-08-10 17:19:12+00', 'chargeback', '2026-08-03 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1022', '739a3aab-d552-4ac8-b72f-a2eefc72591f', 'CUST-5022', 'Premium Widget 22', 707300, 'processed', '2026-08-03 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('ORD-1022', 'TRK-46EC2535', 'lost_in_transit', '2026-08-04 17:19:12+00');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5022', 'ORD-1022', 'support_ticket', 'Where is my order? It has been 3 weeks.', '2026-08-08 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('f04792bd-1aca-4f8f-ae41-b1d439f1dfbd', 'PENDING', 'ACCEPT');
    
-- Case 24: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('f84dc378-c9bf-429f-945f-f962515dcac3', 'pay_cb3ec24a6a7f42', 1048700, 'INR', 'card', 'customer23@email.com', '9876543210', 'captured', '2026-08-05 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('1653a5fb-a407-4660-a8de-90c0e0c72893', 'disp_c3ff07f932d941', 'f84dc378-c9bf-429f-945f-f962515dcac3', 1048700, 'INR', 'product_not_received', 'open', '2026-08-12 17:19:12+00', 'chargeback', '2026-08-05 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1023', 'f84dc378-c9bf-429f-945f-f962515dcac3', 'CUST-5023', 'Premium Widget 23', 1048700, 'processed', '2026-08-05 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1023', 'TRK-1B4A32FF', 'delivered', '2026-08-06 17:19:12+00', '2026-08-09 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5023', 'ORD-1023', 'email', 'I received the item but it is not what I expected.', '2026-08-09 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('1653a5fb-a407-4660-a8de-90c0e0c72893', 'PENDING', 'FIGHT');
    
-- Case 25: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('c5637fbc-6881-434d-bc54-f4f5d810b2ee', 'pay_0bb0f7e1856a40', 5810400, 'INR', 'card', 'customer24@email.com', '9876543210', 'captured', '2026-08-13 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('25664b77-c890-4626-92cc-8cbbb7baa3ed', 'disp_6104f31e484241', 'c5637fbc-6881-434d-bc54-f4f5d810b2ee', 5810400, 'INR', 'product_not_received', 'open', '2026-08-20 17:19:12+00', 'chargeback', '2026-08-13 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1024', 'c5637fbc-6881-434d-bc54-f4f5d810b2ee', 'CUST-5024', 'Premium Widget 24', 5810400, 'processed', '2026-08-13 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1024', 'TRK-FCF10DD0', 'delivered', '2026-08-14 17:19:12+00', '2026-08-17 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5024', 'ORD-1024', 'email', 'I received the item but it is not what I expected.', '2026-08-17 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('25664b77-c890-4626-92cc-8cbbb7baa3ed', 'PENDING', 'FIGHT');
    
-- Case 26: Expected HUMAN_REVIEW

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('55e8a6a4-16f9-43bf-a385-596fcc5d74d8', 'pay_d79ba47b750f45', 6747300, 'INR', 'card', 'customer25@email.com', '9876543210', 'captured', '2026-08-18 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('1a300fdb-f5d9-4d9e-8088-a207ad9873a8', 'disp_154f0f1df03e4a', '55e8a6a4-16f9-43bf-a385-596fcc5d74d8', 6747300, 'INR', 'product_not_received', 'open', '2026-08-25 17:19:12+00', 'chargeback', '2026-08-18 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1025', '55e8a6a4-16f9-43bf-a385-596fcc5d74d8', 'CUST-5025', 'Premium Widget 25', 6747300, 'processed', '2026-08-18 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('ORD-1025', 'TRK-937AAA95', 'delivered', '2026-08-19 17:19:12+00', '2026-08-22 17:19:12+00', 'Unknown Neighbor');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5025', 'ORD-1025', 'chat', 'I never received my package, who is Unknown Neighbor?!', '2026-08-21 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('1a300fdb-f5d9-4d9e-8088-a207ad9873a8', 'PENDING', 'HUMAN_REVIEW');
    
-- Case 27: Expected HUMAN_REVIEW

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('ab59d315-9147-4245-9948-99e88150e078', 'pay_9c48345c6e3a45', 7200100, 'INR', 'card', 'customer26@email.com', '9876543210', 'captured', '2026-08-10 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('478af9e3-ff96-45ba-8c2e-e78e3229b22a', 'disp_bafa30098ce944', 'ab59d315-9147-4245-9948-99e88150e078', 7200100, 'INR', 'order_never_shipped', 'open', '2026-08-17 17:19:12+00', 'chargeback', '2026-08-10 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1026', 'ab59d315-9147-4245-9948-99e88150e078', 'CUST-5026', 'Premium Widget 26', 7200100, 'processed', '2026-08-10 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('ORD-1026', 'TRK-5C60040F', 'delivered', '2026-08-11 17:19:12+00', '2026-08-14 17:19:12+00', 'Unknown Neighbor');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5026', 'ORD-1026', 'chat', 'I never received my package, who is Unknown Neighbor?!', '2026-08-13 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('478af9e3-ff96-45ba-8c2e-e78e3229b22a', 'PENDING', 'HUMAN_REVIEW');
    
-- Case 28: Expected HUMAN_REVIEW

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('27ac74d2-f86b-4d10-adc6-fc594317854b', 'pay_861061866c2e4b', 2181100, 'INR', 'card', 'customer27@email.com', '9876543210', 'captured', '2026-08-03 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('1bff01c1-3bfb-4f7d-8991-490b1a0da093', 'disp_c8f3dccb58914d', '27ac74d2-f86b-4d10-adc6-fc594317854b', 2181100, 'INR', 'product_not_received', 'open', '2026-08-10 17:19:12+00', 'chargeback', '2026-08-03 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1027', '27ac74d2-f86b-4d10-adc6-fc594317854b', 'CUST-5027', 'Premium Widget 27', 2181100, 'processed', '2026-08-03 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('ORD-1027', 'TRK-F25AE926', 'delivered', '2026-08-04 17:19:12+00', '2026-08-07 17:19:12+00', 'Unknown Neighbor');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5027', 'ORD-1027', 'chat', 'I never received my package, who is Unknown Neighbor?!', '2026-08-06 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('1bff01c1-3bfb-4f7d-8991-490b1a0da093', 'PENDING', 'HUMAN_REVIEW');
    
-- Case 29: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('3334556e-c0fe-44a1-afda-0e819e025570', 'pay_6281c5c941de49', 1967900, 'INR', 'card', 'customer28@email.com', '9876543210', 'captured', '2026-08-14 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('74bde2af-d7b3-4f82-b57c-5644807046b0', 'disp_329df69d9cee41', '3334556e-c0fe-44a1-afda-0e819e025570', 1967900, 'INR', 'product_not_received', 'open', '2026-08-21 17:19:12+00', 'chargeback', '2026-08-14 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1028', '3334556e-c0fe-44a1-afda-0e819e025570', 'CUST-5028', 'Premium Widget 28', 1967900, 'processed', '2026-08-14 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1028', 'TRK-9D9ABD29', 'delivered', '2026-08-15 17:19:12+00', '2026-08-18 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5028', 'ORD-1028', 'email', 'I received the item but it is not what I expected.', '2026-08-18 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('74bde2af-d7b3-4f82-b57c-5644807046b0', 'PENDING', 'FIGHT');
    
-- Case 30: Expected HUMAN_REVIEW

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('bc05d479-f3d7-4876-b72b-943d9e69690f', 'pay_d464520aadf940', 6298500, 'INR', 'card', 'customer29@email.com', '9876543210', 'captured', '2026-08-03 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('35e90327-8c20-411b-b817-4a5e76acfa62', 'disp_fb5e937f1da848', 'bc05d479-f3d7-4876-b72b-943d9e69690f', 6298500, 'INR', 'product_not_received', 'open', '2026-08-10 17:19:12+00', 'chargeback', '2026-08-03 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1029', 'bc05d479-f3d7-4876-b72b-943d9e69690f', 'CUST-5029', 'Premium Widget 29', 6298500, 'processed', '2026-08-03 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('ORD-1029', 'TRK-615DC2DA', 'delivered', '2026-08-04 17:19:12+00', '2026-08-07 17:19:12+00', 'Unknown Neighbor');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5029', 'ORD-1029', 'chat', 'I never received my package, who is Unknown Neighbor?!', '2026-08-06 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('35e90327-8c20-411b-b817-4a5e76acfa62', 'PENDING', 'HUMAN_REVIEW');
    
-- Case 31: Expected ACCEPT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('8c423341-dcaa-4abf-a413-55448f894f93', 'pay_bb4f73ff08fb48', 8369700, 'INR', 'card', 'customer30@email.com', '9876543210', 'captured', '2026-08-16 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('f3bc32fa-deeb-40c2-8dc0-c728e65da480', 'disp_bb2df6faeaa047', '8c423341-dcaa-4abf-a413-55448f894f93', 8369700, 'INR', 'product_not_received', 'open', '2026-08-23 17:19:12+00', 'chargeback', '2026-08-16 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1030', '8c423341-dcaa-4abf-a413-55448f894f93', 'CUST-5030', 'Premium Widget 30', 8369700, 'processed', '2026-08-16 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('ORD-1030', 'TRK-20A2B670', 'lost_in_transit', '2026-08-17 17:19:12+00');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5030', 'ORD-1030', 'support_ticket', 'Where is my order? It has been 3 weeks.', '2026-08-21 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('f3bc32fa-deeb-40c2-8dc0-c728e65da480', 'PENDING', 'ACCEPT');
    
-- Case 32: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('d6a02063-e659-4da1-824b-4ba5b094fd86', 'pay_e2b45e3b59b84f', 1349700, 'INR', 'card', 'customer31@email.com', '9876543210', 'captured', '2026-08-14 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('ff0394be-7011-4c7f-b3da-1f6f8154d92d', 'disp_26a91c5307c54b', 'd6a02063-e659-4da1-824b-4ba5b094fd86', 1349700, 'INR', 'product_not_received', 'open', '2026-08-21 17:19:12+00', 'chargeback', '2026-08-14 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1031', 'd6a02063-e659-4da1-824b-4ba5b094fd86', 'CUST-5031', 'Premium Widget 31', 1349700, 'processed', '2026-08-14 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1031', 'TRK-F160FAD1', 'delivered', '2026-08-15 17:19:12+00', '2026-08-18 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5031', 'ORD-1031', 'email', 'I received the item but it is not what I expected.', '2026-08-18 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('ff0394be-7011-4c7f-b3da-1f6f8154d92d', 'PENDING', 'FIGHT');
    
-- Case 33: Expected HUMAN_REVIEW

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('2949ff66-9ff6-4640-965c-e36e2e6a0922', 'pay_05874638e0ba40', 2154600, 'INR', 'card', 'customer32@email.com', '9876543210', 'captured', '2026-08-02 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('4a7e293e-694d-4494-b445-e1960b222f57', 'disp_b4a2ae64429145', '2949ff66-9ff6-4640-965c-e36e2e6a0922', 2154600, 'INR', 'product_not_received', 'open', '2026-08-09 17:19:12+00', 'chargeback', '2026-08-02 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1032', '2949ff66-9ff6-4640-965c-e36e2e6a0922', 'CUST-5032', 'Premium Widget 32', 2154600, 'processed', '2026-08-02 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('ORD-1032', 'TRK-AEF771A1', 'delivered', '2026-08-03 17:19:12+00', '2026-08-06 17:19:12+00', 'Unknown Neighbor');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5032', 'ORD-1032', 'chat', 'I never received my package, who is Unknown Neighbor?!', '2026-08-05 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('4a7e293e-694d-4494-b445-e1960b222f57', 'PENDING', 'HUMAN_REVIEW');
    
-- Case 34: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('2ffc9146-6a3c-4dc9-99e3-dd1bf7c7fb0f', 'pay_1912a29d343a44', 1966100, 'INR', 'card', 'customer33@email.com', '9876543210', 'captured', '2026-08-19 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('2ab210ad-1fa0-40b5-bb4f-93c3d44eb25a', 'disp_245e348af7004a', '2ffc9146-6a3c-4dc9-99e3-dd1bf7c7fb0f', 1966100, 'INR', 'order_never_shipped', 'open', '2026-08-26 17:19:12+00', 'chargeback', '2026-08-19 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1033', '2ffc9146-6a3c-4dc9-99e3-dd1bf7c7fb0f', 'CUST-5033', 'Premium Widget 33', 1966100, 'processed', '2026-08-19 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1033', 'TRK-91D6F7CD', 'delivered', '2026-08-20 17:19:12+00', '2026-08-23 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5033', 'ORD-1033', 'email', 'Thanks for delivery.', '2026-08-23 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('2ab210ad-1fa0-40b5-bb4f-93c3d44eb25a', 'PENDING', 'FIGHT');
    
-- Case 35: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('78785fb5-0305-47d6-9c3a-40bd964fafd4', 'pay_47057a63b1274c', 4915800, 'INR', 'card', 'customer34@email.com', '9876543210', 'captured', '2026-08-13 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('3e77ef53-8b51-40c9-87c1-130b20210f89', 'disp_d8d716bcab0e49', '78785fb5-0305-47d6-9c3a-40bd964fafd4', 4915800, 'INR', 'product_not_received', 'open', '2026-08-20 17:19:12+00', 'chargeback', '2026-08-13 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1034', '78785fb5-0305-47d6-9c3a-40bd964fafd4', 'CUST-5034', 'Premium Widget 34', 4915800, 'processed', '2026-08-13 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1034', 'TRK-8BAACB01', 'delivered', '2026-08-14 17:19:12+00', '2026-08-17 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5034', 'ORD-1034', 'email', 'I received the item but it is not what I expected.', '2026-08-17 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('3e77ef53-8b51-40c9-87c1-130b20210f89', 'PENDING', 'FIGHT');
    
-- Case 36: Expected HUMAN_REVIEW

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('0851758a-54a3-4c64-a4d3-d66734620b4f', 'pay_4a63074fb2704a', 3078200, 'INR', 'card', 'customer35@email.com', '9876543210', 'captured', '2026-08-18 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('3fb5a8e7-2d7b-491a-ada9-0bbf32086ad9', 'disp_3ba82e6ac8524e', '0851758a-54a3-4c64-a4d3-d66734620b4f', 3078200, 'INR', 'product_not_received', 'open', '2026-08-25 17:19:12+00', 'chargeback', '2026-08-18 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1035', '0851758a-54a3-4c64-a4d3-d66734620b4f', 'CUST-5035', 'Premium Widget 35', 3078200, 'processed', '2026-08-18 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('ORD-1035', 'TRK-FDADD7F3', 'delivered', '2026-08-19 17:19:12+00', '2026-08-22 17:19:12+00', 'Unknown Neighbor');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5035', 'ORD-1035', 'chat', 'I never received my package, who is Unknown Neighbor?!', '2026-08-21 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('3fb5a8e7-2d7b-491a-ada9-0bbf32086ad9', 'PENDING', 'HUMAN_REVIEW');
    
-- Case 37: Expected ACCEPT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('6847e9af-092b-4567-8da8-dccc86545ca3', 'pay_879f3684b5e040', 4160000, 'INR', 'card', 'customer36@email.com', '9876543210', 'captured', '2026-08-10 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('37cea726-8da0-4a58-8528-960d10fca046', 'disp_7449fc96afea47', '6847e9af-092b-4567-8da8-dccc86545ca3', 4160000, 'INR', 'order_never_shipped', 'open', '2026-08-17 17:19:12+00', 'chargeback', '2026-08-10 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1036', '6847e9af-092b-4567-8da8-dccc86545ca3', 'CUST-5036', 'Premium Widget 36', 4160000, 'processed', '2026-08-10 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('ORD-1036', 'TRK-C0A9B87F', 'lost_in_transit', '2026-08-11 17:19:12+00');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5036', 'ORD-1036', 'support_ticket', 'Where is my order? It has been 3 weeks.', '2026-08-15 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('37cea726-8da0-4a58-8528-960d10fca046', 'PENDING', 'ACCEPT');
    
-- Case 38: Expected HUMAN_REVIEW

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('af564571-ff05-4888-99e3-bd535578130e', 'pay_0a6cb4f8099843', 1370200, 'INR', 'card', 'customer37@email.com', '9876543210', 'captured', '2026-08-03 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('fab17873-11cd-46cb-8133-ba308fb841c0', 'disp_1dbd3105972c4c', 'af564571-ff05-4888-99e3-bd535578130e', 1370200, 'INR', 'product_not_received', 'open', '2026-08-10 17:19:12+00', 'chargeback', '2026-08-03 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1037', 'af564571-ff05-4888-99e3-bd535578130e', 'CUST-5037', 'Premium Widget 37', 1370200, 'processed', '2026-08-03 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by)
        VALUES ('ORD-1037', 'TRK-D274D11E', 'delivered', '2026-08-04 17:19:12+00', '2026-08-07 17:19:12+00', 'Unknown Neighbor');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5037', 'ORD-1037', 'chat', 'I never received my package, who is Unknown Neighbor?!', '2026-08-06 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('fab17873-11cd-46cb-8133-ba308fb841c0', 'PENDING', 'HUMAN_REVIEW');
    
-- Case 39: Expected ACCEPT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('29159d48-b238-4b62-b51e-2344e85af90b', 'pay_959c3d2249084e', 6596800, 'INR', 'card', 'customer38@email.com', '9876543210', 'captured', '2026-08-01 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('417d2ff4-7a8a-492f-97c2-c85c76493f6c', 'disp_ca8c976a9c624c', '29159d48-b238-4b62-b51e-2344e85af90b', 6596800, 'INR', 'product_not_received', 'open', '2026-08-08 17:19:12+00', 'chargeback', '2026-08-01 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1038', '29159d48-b238-4b62-b51e-2344e85af90b', 'CUST-5038', 'Premium Widget 38', 6596800, 'processed', '2026-08-01 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('ORD-1038', 'TRK-C3F4ABC5', 'lost_in_transit', '2026-08-02 17:19:12+00');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5038', 'ORD-1038', 'support_ticket', 'Where is my order? It has been 3 weeks.', '2026-08-06 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('417d2ff4-7a8a-492f-97c2-c85c76493f6c', 'PENDING', 'ACCEPT');
    
-- Case 40: Expected ACCEPT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('b9f451a7-bc09-475a-81eb-f0abc3edbeb3', 'pay_9e6e8de4a7b248', 5665800, 'INR', 'card', 'customer39@email.com', '9876543210', 'captured', '2026-08-12 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('ae68885e-9423-4b99-a6b1-27d24ad0e3ab', 'disp_d450d0bee56148', 'b9f451a7-bc09-475a-81eb-f0abc3edbeb3', 5665800, 'INR', 'product_not_received', 'open', '2026-08-19 17:19:12+00', 'chargeback', '2026-08-12 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1039', 'b9f451a7-bc09-475a-81eb-f0abc3edbeb3', 'CUST-5039', 'Premium Widget 39', 5665800, 'processed', '2026-08-12 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('ORD-1039', 'TRK-D274CCD3', 'lost_in_transit', '2026-08-13 17:19:12+00');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5039', 'ORD-1039', 'support_ticket', 'Where is my order? It has been 3 weeks.', '2026-08-17 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('ae68885e-9423-4b99-a6b1-27d24ad0e3ab', 'PENDING', 'ACCEPT');
    
-- Case 41: Expected ACCEPT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('e00915df-3fc1-4d2b-9384-0dc3d960c907', 'pay_d754acae258e40', 7096300, 'INR', 'card', 'customer40@email.com', '9876543210', 'captured', '2026-08-03 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('58baf49b-3e56-4830-bbbc-8e1ab407764c', 'disp_6e6b10190e8a4e', 'e00915df-3fc1-4d2b-9384-0dc3d960c907', 7096300, 'INR', 'product_not_received', 'open', '2026-08-10 17:19:12+00', 'chargeback', '2026-08-03 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1040', 'e00915df-3fc1-4d2b-9384-0dc3d960c907', 'CUST-5040', 'Premium Widget 40', 7096300, 'processed', '2026-08-03 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('ORD-1040', 'TRK-CAF567E4', 'lost_in_transit', '2026-08-04 17:19:12+00');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5040', 'ORD-1040', 'support_ticket', 'Where is my order? It has been 3 weeks.', '2026-08-08 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('58baf49b-3e56-4830-bbbc-8e1ab407764c', 'PENDING', 'ACCEPT');
    
-- Case 42: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('515e4883-1505-437a-9fdb-4cdf1808758a', 'pay_9891d660f8704d', 1069800, 'INR', 'card', 'customer41@email.com', '9876543210', 'captured', '2026-08-19 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('e362dc74-efb9-420d-81c9-90f52e966735', 'disp_8126b1ac7ff64a', '515e4883-1505-437a-9fdb-4cdf1808758a', 1069800, 'INR', 'product_not_received', 'open', '2026-08-26 17:19:12+00', 'chargeback', '2026-08-19 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1041', '515e4883-1505-437a-9fdb-4cdf1808758a', 'CUST-5041', 'Premium Widget 41', 1069800, 'processed', '2026-08-19 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1041', 'TRK-3A835D96', 'delivered', '2026-08-20 17:19:12+00', '2026-08-23 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5041', 'ORD-1041', 'email', 'I received the item but it is not what I expected.', '2026-08-23 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('e362dc74-efb9-420d-81c9-90f52e966735', 'PENDING', 'FIGHT');
    
-- Case 43: Expected ACCEPT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('690c3600-40e3-4cc7-816f-163f2728814a', 'pay_75806d84b9ff4f', 4591200, 'INR', 'card', 'customer42@email.com', '9876543210', 'captured', '2026-08-10 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('930efc96-9668-463a-a92b-d0ffed607925', 'disp_145fc327290b45', '690c3600-40e3-4cc7-816f-163f2728814a', 4591200, 'INR', 'product_not_received', 'open', '2026-08-17 17:19:12+00', 'chargeback', '2026-08-10 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1042', '690c3600-40e3-4cc7-816f-163f2728814a', 'CUST-5042', 'Premium Widget 42', 4591200, 'processed', '2026-08-10 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('ORD-1042', 'TRK-ADCADA84', 'lost_in_transit', '2026-08-11 17:19:12+00');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5042', 'ORD-1042', 'support_ticket', 'Where is my order? It has been 3 weeks.', '2026-08-15 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('930efc96-9668-463a-a92b-d0ffed607925', 'PENDING', 'ACCEPT');
    
-- Case 44: Expected ACCEPT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('474fbcc0-c29b-453f-b34f-73f6f6759e8a', 'pay_12df95e09f984a', 541900, 'INR', 'card', 'customer43@email.com', '9876543210', 'captured', '2026-08-06 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('9bf85541-ccc4-48b2-a075-5523c487e4c4', 'disp_2d16c4be0db747', '474fbcc0-c29b-453f-b34f-73f6f6759e8a', 541900, 'INR', 'product_not_received', 'open', '2026-08-13 17:19:12+00', 'chargeback', '2026-08-06 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1043', '474fbcc0-c29b-453f-b34f-73f6f6759e8a', 'CUST-5043', 'Premium Widget 43', 541900, 'processed', '2026-08-06 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('ORD-1043', 'TRK-15D22E32', 'lost_in_transit', '2026-08-07 17:19:12+00');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5043', 'ORD-1043', 'support_ticket', 'Where is my order? It has been 3 weeks.', '2026-08-11 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('9bf85541-ccc4-48b2-a075-5523c487e4c4', 'PENDING', 'ACCEPT');
    
-- Case 45: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('90ca662e-9a59-42d2-a233-5db8cd416ac5', 'pay_740431fee47a41', 4192700, 'INR', 'card', 'customer44@email.com', '9876543210', 'captured', '2026-08-14 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('1b2dc8df-1434-41e9-8d78-cc7e5d6c70e6', 'disp_d6e4c1846c414e', '90ca662e-9a59-42d2-a233-5db8cd416ac5', 4192700, 'INR', 'order_never_shipped', 'open', '2026-08-21 17:19:12+00', 'chargeback', '2026-08-14 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1044', '90ca662e-9a59-42d2-a233-5db8cd416ac5', 'CUST-5044', 'Premium Widget 44', 4192700, 'processed', '2026-08-14 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1044', 'TRK-45446811', 'delivered', '2026-08-15 17:19:12+00', '2026-08-18 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5044', 'ORD-1044', 'email', 'Thanks for delivery.', '2026-08-18 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('1b2dc8df-1434-41e9-8d78-cc7e5d6c70e6', 'PENDING', 'FIGHT');
    
-- Case 46: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('38d1100e-82f4-4246-b0a1-085f41373d75', 'pay_6eaa77db56584d', 6120400, 'INR', 'card', 'customer45@email.com', '9876543210', 'captured', '2026-08-08 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('eb72023c-297f-4b0f-9966-a3aab01250ef', 'disp_eec9c71ab41c4f', '38d1100e-82f4-4246-b0a1-085f41373d75', 6120400, 'INR', 'product_not_received', 'open', '2026-08-15 17:19:12+00', 'chargeback', '2026-08-08 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1045', '38d1100e-82f4-4246-b0a1-085f41373d75', 'CUST-5045', 'Premium Widget 45', 6120400, 'processed', '2026-08-08 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1045', 'TRK-CBF11757', 'delivered', '2026-08-09 17:19:12+00', '2026-08-12 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5045', 'ORD-1045', 'email', 'I received the item but it is not what I expected.', '2026-08-12 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('eb72023c-297f-4b0f-9966-a3aab01250ef', 'PENDING', 'FIGHT');
    
-- Case 47: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('d19a9ffc-7721-4eff-9ec2-19d367d9c898', 'pay_f60292f8f2484b', 5776500, 'INR', 'card', 'customer46@email.com', '9876543210', 'captured', '2026-08-13 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('6b80e078-9da6-43c3-8d13-20c9c01a22b0', 'disp_5479a46ad26b49', 'd19a9ffc-7721-4eff-9ec2-19d367d9c898', 5776500, 'INR', 'order_never_shipped', 'open', '2026-08-20 17:19:12+00', 'chargeback', '2026-08-13 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1046', 'd19a9ffc-7721-4eff-9ec2-19d367d9c898', 'CUST-5046', 'Premium Widget 46', 5776500, 'processed', '2026-08-13 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1046', 'TRK-8BC6B6D2', 'delivered', '2026-08-14 17:19:12+00', '2026-08-17 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5046', 'ORD-1046', 'email', 'Thanks for delivery.', '2026-08-17 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('6b80e078-9da6-43c3-8d13-20c9c01a22b0', 'PENDING', 'FIGHT');
    
-- Case 48: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('fe4c59b4-92cc-404d-b50e-fd03703c58dd', 'pay_0e61b1930bcf4f', 4740500, 'INR', 'card', 'customer47@email.com', '9876543210', 'captured', '2026-08-18 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('07dd6aa9-3ca5-4d7d-9a98-01b4abbb3cce', 'disp_8685491ea4c642', 'fe4c59b4-92cc-404d-b50e-fd03703c58dd', 4740500, 'INR', 'order_never_shipped', 'open', '2026-08-25 17:19:12+00', 'chargeback', '2026-08-18 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1047', 'fe4c59b4-92cc-404d-b50e-fd03703c58dd', 'CUST-5047', 'Premium Widget 47', 4740500, 'processed', '2026-08-18 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1047', 'TRK-9DAEA174', 'delivered', '2026-08-19 17:19:12+00', '2026-08-22 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5047', 'ORD-1047', 'email', 'Thanks for delivery.', '2026-08-22 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('07dd6aa9-3ca5-4d7d-9a98-01b4abbb3cce', 'PENDING', 'FIGHT');
    
-- Case 49: Expected ACCEPT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('5329257d-a979-4bb0-b846-3d158010cb34', 'pay_1a7845173d8747', 4843400, 'INR', 'card', 'customer48@email.com', '9876543210', 'captured', '2026-08-16 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('52827c22-a51c-4865-9295-d492820e45e0', 'disp_4bceccc0b87645', '5329257d-a979-4bb0-b846-3d158010cb34', 4843400, 'INR', 'order_never_shipped', 'open', '2026-08-23 17:19:12+00', 'chargeback', '2026-08-16 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1048', '5329257d-a979-4bb0-b846-3d158010cb34', 'CUST-5048', 'Premium Widget 48', 4843400, 'processed', '2026-08-16 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at)
        VALUES ('ORD-1048', 'TRK-45E87856', 'lost_in_transit', '2026-08-17 17:19:12+00');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5048', 'ORD-1048', 'support_ticket', 'Where is my order? It has been 3 weeks.', '2026-08-21 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('52827c22-a51c-4865-9295-d492820e45e0', 'PENDING', 'ACCEPT');
    
-- Case 50: Expected FIGHT

    INSERT INTO payments (id, razorpay_payment_id, amount, currency, method, email, contact, status, created_at)
    VALUES ('db595afc-c476-4704-a7eb-798f517d8787', 'pay_899a50873b2846', 3134700, 'INR', 'card', 'customer49@email.com', '9876543210', 'captured', '2026-08-01 17:19:12+00');
    

    INSERT INTO disputes (id, razorpay_dispute_id, payment_id, amount, currency, reason_code, status, respond_by, phase, created_at)
    VALUES ('0ad8f35d-35df-4fd1-be5c-f2194d1bf91a', 'disp_e9c35e3702f447', 'db595afc-c476-4704-a7eb-798f517d8787', 3134700, 'INR', 'order_never_shipped', 'open', '2026-08-08 17:19:12+00', 'chargeback', '2026-08-01 17:19:12+00');
    

    INSERT INTO orders (order_id, payment_id, customer_id, product, amount, status, created_at)
    VALUES ('ORD-1049', 'db595afc-c476-4704-a7eb-798f517d8787', 'CUST-5049', 'Premium Widget 49', 3134700, 'processed', '2026-08-01 17:19:12+00');
    

        INSERT INTO shipping_records (order_id, tracking_id, status, shipped_at, delivered_at, signed_by, delivery_location)
        VALUES ('ORD-1049', 'TRK-3CF264FC', 'delivered', '2026-08-02 17:19:12+00', '2026-08-05 17:19:12+00', 'Customer', 'Front Porch');
        

        INSERT INTO customer_messages (customer_id, order_id, channel, message, timestamp)
        VALUES ('CUST-5049', 'ORD-1049', 'email', 'Thanks for delivery.', '2026-08-05 17:19:12+00');
        

    INSERT INTO investigations (dispute_id, status, ground_truth_decision)
    VALUES ('0ad8f35d-35df-4fd1-be5c-f2194d1bf91a', 'PENDING', 'FIGHT');
    
