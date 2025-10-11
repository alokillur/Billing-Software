package com.alokillur.billingsoftware.service;

import com.alokillur.billingsoftware.io.CategoryRequest;
import com.alokillur.billingsoftware.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService  {
//    CategoryResponse add(CategoryRequest request);

    CategoryResponse add(CategoryRequest request, MultipartFile imageFile);

    List<CategoryResponse> read();

    void delete(String categoryId);
}
