package com.alokillur.billingsoftware.service.impl;

import com.alokillur.billingsoftware.service.FileUploadService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FileUploadServiceImpl implements FileUploadService {

    private final Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            return null;
        }

        try {
            var result = cloudinary.uploader()
                    .upload(file.getBytes(), ObjectUtils.emptyMap());

            return (String) result.get("secure_url");

        } catch (Exception e) {
            throw new RuntimeException("File upload failed!", e);
        }
    }

    @Override
    public boolean delete(String imgUrl) {
        try {
            String publicId = extractPublicId(imgUrl);

            var result = cloudinary.uploader()
                    .destroy(publicId, ObjectUtils.emptyMap());

            return "ok".equals(result.get("result"));
        } catch (Exception e) {
            throw new RuntimeException("Image deletion failed!", e);
        }
    }

    private String extractPublicId(String url) {
        try {
            String[] parts = url.split("/upload/");
            String rightPart = parts[1];

            rightPart = rightPart.substring(rightPart.indexOf('/') + 1);

            return rightPart.replaceFirst("\\.[^.]+$", "");

        } catch (Exception e) {
            throw new RuntimeException("Cannot extract public_id from URL: " + url, e);
        }
    }
}
