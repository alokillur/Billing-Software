package com.alokillur.billingsoftware.service.impl;

import com.alokillur.billingsoftware.entity.CategoryEntity;
import com.alokillur.billingsoftware.io.CategoryRequest;
import com.alokillur.billingsoftware.io.CategoryResponse;
import com.alokillur.billingsoftware.repository.CategoryRepository;
import com.alokillur.billingsoftware.service.CategoryService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final Cloudinary cloudinary;

    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile imageFile) {
        CategoryEntity newCategory = convertToEntity(request);

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                var uploadResult = cloudinary.uploader().upload(imageFile.getBytes(), ObjectUtils.emptyMap());
                String imageUrl = (String) uploadResult.get("secure_url");
                newCategory.setImgUrl(imageUrl);
            } catch (Exception e) {
                throw new RuntimeException("Image upload failed", e);
            }
        }
        newCategory = categoryRepository.save(newCategory);
        return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryEntity -> convertToResponse(categoryEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
        CategoryEntity entity = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found: "+categoryId));
        categoryRepository.delete(entity);
    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .build();
    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
        return CategoryResponse.builder()
                .categoryId((newCategory.getCategoryId()))
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .imgUrl(newCategory.getImgUrl())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .build();
    }
}
