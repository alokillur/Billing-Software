package com.alokillur.billingsoftware.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentVerification {
    private String razorpayOrderId;
    private String razorPaymentId;
    private String razorpaySignature;
    private String orderId;
}
