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

    private OrderItemEntity convertToOrderItemEntity(OrderRequest.OrderItemRequest orderItemRequest) {
        return OrderItemEntity.builder().
                itemId(orderItemRequest.getItemId())
                .name(orderItemRequest.getName())
                .price(orderItemRequest.getPrice())
                .quantity(orderItemRequest.getQuantity())
                .build();
    }

    private OrderResponse convertToResponse(OrderEntity request) {
        return OrderResponse.builder()
                .orderId(request.getOrderId())
                .customerName(request.getCustomerName())
                .phoneNumber(request.getPhoneNumber())
                .subtotal(request.getSubtotal())
                .tax(request.getTax())
                .grandTotal(request.getGrandTotal())
                .paymentMethod(request.getPaymentMethod())
                .items(request.getItems().stream().map(this::convertToItemResponse).collect(Collectors.toList()))
                .paymentDetails(request.getPaymentDetails())
                .createdAt(request.getCreatedAt())
                .build();
    }

    private OrderResponse.OrderItemResponse convertToItemResponse(OrderItemEntity orderItemEntity) {
        return OrderResponse.OrderItemResponse.builder()
                .itemId(orderItemEntity.getItemId())
                .name(orderItemEntity.getName())
                .price(orderItemEntity.getPrice())
                .quantity(orderItemEntity.getQuantity())
                .build();
    }

    private OrderEntity convertToOrderEntity(OrderRequest request) {
        return OrderEntity.builder()
                .customerName(request.getCustomerName())
                .phoneNumber(request.getPhoneNumber())
                .subtotal(request.getSubtotal())
                .tax(request.getTax())
                .grandTotal(request.getGrandTotal())
                .paymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()))
                .build();
    }

    @Override
    public void deleteOrder(String OrderId) {
        OrderEntity existingOrder = orderEntityRepository.findByOrderId(OrderId)
                .orElseThrow(() -> new RuntimeException("Order not found!"));

        orderEntityRepository.delete(existingOrder);
    }

    @Override
    public List<OrderResponse> getLatestOrders() {
        return orderEntityRepository.findAllByOrderByCreatedAtDesc()
                .stream().map(this::convertToResponse)
                .collect(Collectors.toList());
    }
}
