package com.alokillur.billingsoftware.controller;

import com.alokillur.billingsoftware.io.CategoryRequest;
import com.alokillur.billingsoftware.io.CategoryResponse;
import com.alokillur.billingsoftware.service.CategoryService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public CategoryResponse addCategory(
            @RequestPart(value = "request") String requestJson,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile
    ) throws JsonProcessingException {
        CategoryRequest request = new ObjectMapper().readValue(requestJson, CategoryRequest.class);
        System.out.println(request);
        return categoryService.add(request, imageFile);
    }

    @GetMapping
    public List<CategoryResponse> fetchCategories() {
        return categoryService.read();
    }

    @DeleteMapping("/{categoryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String categoryId) {
        try {
            categoryService.delete(categoryId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}

