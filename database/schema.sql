-- database/schema.sql

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- MERCHANTS
CREATE TABLE merchants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PAYMENTS
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    razorpay_payment_id VARCHAR(255) UNIQUE NOT NULL,
    amount INTEGER NOT NULL, -- in smallest currency unit (paise)
    currency VARCHAR(3) DEFAULT 'INR',
    method VARCHAR(50),
    email VARCHAR(255),
    contact VARCHAR(50),
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DISPUTES
CREATE TABLE disputes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    razorpay_dispute_id VARCHAR(255) UNIQUE NOT NULL,
    payment_id UUID REFERENCES payments(id),
    amount INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    reason_code VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'open',
    respond_by TIMESTAMP WITH TIME ZONE,
    phase VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ORDERS
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(100) UNIQUE NOT NULL,
    payment_id UUID REFERENCES payments(id),
    customer_id VARCHAR(100),
    product VARCHAR(255),
    amount INTEGER NOT NULL,
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SHIPPING RECORDS
CREATE TABLE shipping_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(100) REFERENCES orders(order_id),
    tracking_id VARCHAR(100),
    status VARCHAR(50),
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    signed_by VARCHAR(255),
    delivery_location VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CUSTOMER MESSAGES
CREATE TABLE customer_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id VARCHAR(100),
    order_id VARCHAR(100) REFERENCES orders(order_id),
    channel VARCHAR(50),
    message TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INVESTIGATIONS
CREATE TABLE investigations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dispute_id UUID REFERENCES disputes(id),
    status VARCHAR(50) DEFAULT 'STARTED',
    decision VARCHAR(50), -- FIGHT, ACCEPT, HUMAN_REVIEW
    confidence NUMERIC(5, 2),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    reasoning_summary TEXT,
    ground_truth_decision VARCHAR(50) -- Used for benchmarking
);

-- EVIDENCE
CREATE TABLE evidence (
    id VARCHAR(50) PRIMARY KEY, -- ID like 'EV-001'
    investigation_id UUID REFERENCES investigations(id) ON DELETE CASCADE,
    source VARCHAR(100),
    source_record_id VARCHAR(100),
    evidence_type VARCHAR(100),
    claim TEXT,
    value TEXT,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AUDIT LOGS
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    investigation_id UUID REFERENCES investigations(id) ON DELETE CASCADE,
    action VARCHAR(255) NOT NULL,
    actor VARCHAR(100) DEFAULT 'system',
    details JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
