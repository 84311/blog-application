package com.example.blogapp.model.dtos;

import com.example.blogapp.model.Category;
import com.example.blogapp.model.Post;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BlogDataDTO {
    private List<Category> categories;
    private List<Post> posts;
}