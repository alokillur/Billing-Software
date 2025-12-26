package com.alokillur.billingsoftware.service;

import com.alokillur.billingsoftware.io.OrderRequest;
import com.alokillur.billingsoftware.io.OrderResponse;
import com.alokillur.billingsoftware.io.PaymentVerification;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String OrderId);

    List<OrderResponse> getLatestOrders();

    OrderResponse verifyPayment(PaymentVerification request);

    Double sumSalesByDate(LocalDate date);

    Long countByOrderDate(LocalDate date);

    List<OrderResponse> findRecentOrders();
}
