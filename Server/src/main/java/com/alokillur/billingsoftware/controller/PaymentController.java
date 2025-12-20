package com.alokillur.billingsoftware.controller;

import com.alokillur.billingsoftware.io.OrderResponse;
import com.alokillur.billingsoftware.io.PaymentRequest;
import com.alokillur.billingsoftware.io.PaymentVerification;
import com.alokillur.billingsoftware.io.RazorpayOrderResponse;
import com.alokillur.billingsoftware.service.OrderService;
import com.alokillur.billingsoftware.service.RazorpayService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest paymentRequest) {
        try {
            return razorpayService.createOrder(paymentRequest.getAmount(), paymentRequest.getCurrency());
        } catch (RazorpayException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerification request) {
        return orderService.verifyPayment(request);
    }
}
