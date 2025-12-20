package com.alokillur.billingsoftware.service.impl;


import com.alokillur.billingsoftware.io.RazorpayOrderResponse;
import com.alokillur.billingsoftware.service.RazorpayService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RazorPayServiceImpl implements RazorpayService {

    @Override
    public RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException {

    }
}
