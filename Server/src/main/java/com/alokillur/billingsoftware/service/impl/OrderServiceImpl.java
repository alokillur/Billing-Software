package com.alokillur.billingsoftware.service.impl;

import com.alokillur.billingsoftware.entity.OrderEntity;
import com.alokillur.billingsoftware.entity.OrderItemEntity;
import com.alokillur.billingsoftware.io.OrderRequest;
import com.alokillur.billingsoftware.io.OrderResponse;
import com.alokillur.billingsoftware.io.PaymentDetails;
import com.alokillur.billingsoftware.io.PaymentMethod;
import com.alokillur.billingsoftware.repository.OrderEntityRepository;
import com.alokillur.billingsoftware.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderEntityRepository orderEntityRepository;

    @Override
    public OrderResponse createOrder(OrderRequest request) {
        OrderEntity newOrder = convertToOrderEntity(request);
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setStatus(newOrder.getPaymentMethod() == PaymentMethod.CASH ?
                PaymentDetails.PaymentStatus.COMPLETED : PaymentDetails.PaymentStatus.PENDING) ;
        newOrder.setPaymentDetails(paymentDetails);
        List<OrderItemEntity> orderItemEntities = request.getCartItems().stream().map(this::convertToOrderItemEntity)
                .collect(Collectors.toList());
        newOrder.setItems(orderItemEntities);

        newOrder = orderEntityRepository.save(newOrder);

        return convertToResponse(newOrder);
    }

    private Object convertToOrderItemEntity(OrderRequest.OrderItemRequest orderItemRequest) {
    }

    private OrderResponse convertToResponse(OrderEntity newOrder) {

    }

    private OrderEntity convertToOrderEntity(OrderRequest request) {
    }

    @Override
    public void deleteOrder(String OrderId) {

    }

    @Override
    public List<OrderResponse> getLatestOrders() {
        return List.of();
    }
}
