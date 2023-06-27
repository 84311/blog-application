package com.example.blogapp.services;

import com.example.blogapp.model.Category;
import com.example.blogapp.model.Post;
import com.example.blogapp.model.dtos.BlogDataDTO;
import com.example.blogapp.repositories.CategoryRepo;
import com.example.blogapp.repositories.PostRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BlogService {
    private final PostRepo postRepo;
    private final CategoryRepo categoryRepo;

    public BlogDataDTO getBlogData(String sort) {
        BlogDataDTO blogDataDTO = new BlogDataDTO();
        blogDataDTO.setPosts(getSortedPosts(sort));
        blogDataDTO.setCategories(getCategories());

        return blogDataDTO;
    }

    private List<Post> getSortedPosts(String sortBy) {
        List<Post> posts;

        if (sortBy == null) {
            sortBy = "DATE_DESC";
        }

        switch (sortBy) {
            case "ALPHABETICALLY_ASC" -> posts = postRepo.findAll(Sort.by(Sort.Direction.ASC, "title"));
            case "ALPHABETICALLY_DESC" -> posts = postRepo.findAll(Sort.by(Sort.Direction.DESC, "title"));
            case "DATE_ASC" -> posts = postRepo.findAll(Sort.by(Sort.Direction.ASC, "date"));
            default -> posts = postRepo.findAll(Sort.by(Sort.Direction.DESC, "date"));
        }

        return posts;
    }

    public Post getPost(long id) {
        return postRepo.findById(id).orElse(null);
    }

    public void addPost(Post post) {
        post.setDate(LocalDateTime.now());
        postRepo.save(post);
    }

    public boolean removePost(long id) {
        boolean exists = postRepo.existsById(id);
        postRepo.deleteById(id);

        return exists && !postRepo.existsById(id);
    }

    public boolean editPostTitle(long id, String title) {
        Post post = getPost(id);

        if (post != null) {
            post.setTitle(title);
            postRepo.save(post);
            return true;
        }
        return false;
    }

    public boolean editPostContent(long id, String content) {
        Post post = getPost(id);

        if (post != null) {
            post.setContent(content);
            postRepo.save(post);
            return true;
        }
        return false;
    }

    public List<Category> getCategories() {
        return categoryRepo.findAll();
    }

    public void addCategory(String categoryName) {
        Category category = new Category();
        category.setName(categoryName);

        List<Category> categories = getCategories();
        categories.add(category);
        categoryRepo.save(category);
    }

    public boolean removeCategory(long id) {
        boolean exists = categoryRepo.existsById(id);
        categoryRepo.deleteById(id);

        return exists && !categoryRepo.existsById(id);
    }
}
