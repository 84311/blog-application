package com.example.blogapp.controllers;

import com.example.blogapp.model.Category;
import com.example.blogapp.model.Post;
import com.example.blogapp.model.dtos.BlogDataDTO;
import com.example.blogapp.services.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH, RequestMethod.DELETE})
public class BlogController {
    private final BlogService blogService;

    @GetMapping("/blog-data")
    public BlogDataDTO getBlogData(@RequestParam(required = false) String sort) {
        return blogService.getBlogData(sort);
    }

    @GetMapping("/categories")
    public List<Category> getCategories() {
        return blogService.getCategories();
    }

    @PostMapping("/category/{categoryName}")
    public void addCategory(@PathVariable String categoryName) {
        blogService.addCategory(categoryName);
    }

    @DeleteMapping("/category/{id}")
    public void removeCategory(@PathVariable long id) {
        boolean removed = blogService.removeCategory(id);
        if (!removed) throw new ResponseStatusException(NOT_FOUND, "Category not found");
    }

    @GetMapping("/post/{id}")
    public Post getPost(@PathVariable long id) {
        return Optional.of(blogService.getPost(id))
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Post not found"));
    }

    @PostMapping("/post")
    public void addPost(@RequestBody Post post) {
        blogService.addPost(post);
    }

    @DeleteMapping("/post/{id}")
    public void removePost(@PathVariable long id) {
        boolean removed = blogService.removePost(id);
        if (!removed) throw new ResponseStatusException(NOT_FOUND, "Post not found");
    }

    @PatchMapping("/post/{id}/title")
    public void editPostTitle(@PathVariable long id, @RequestBody Map<String, String> newPostTitle) {
        if (!newPostTitle.containsKey("title")) {
            throw new ResponseStatusException(BAD_REQUEST, "\"title\" field is required");
        }

        boolean edited = blogService.editPostTitle(id, newPostTitle.get("title"));
        if (!edited) throw new ResponseStatusException(NOT_FOUND, "Post not found");
    }

    @PatchMapping("/post/{id}/content")
    public void editPostContent(@PathVariable long id, @RequestBody Map<String, String> newPostContent) {
        if (!newPostContent.containsKey("content")) {
            throw new ResponseStatusException(BAD_REQUEST, "\"content\" field is required");
        }

        boolean edited = blogService.editPostContent(id, newPostContent.get("content"));
        if (!edited) throw new ResponseStatusException(NOT_FOUND, "Post not found");
    }
}
