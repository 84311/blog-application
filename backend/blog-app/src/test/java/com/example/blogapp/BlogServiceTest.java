package com.example.blogapp;

import com.example.blogapp.model.Category;
import com.example.blogapp.model.Post;
import com.example.blogapp.repositories.CategoryRepo;
import com.example.blogapp.repositories.PostRepo;
import com.example.blogapp.services.BlogService;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class BlogServiceTest {
    @Mock
    private PostRepo postRepo;

    @Mock
    private CategoryRepo categoryRepo;

    @InjectMocks
    private BlogService blogService;

    @Test
    void testAddPost() {
        // Given ?
        Post post = new Post();
        post.setTitle("Test Title");
        post.setContent("Test Content");
        LocalDateTime now = LocalDateTime.now();

        // When
        blogService.addPost(post);

        // Then
        assertNotNull(post.getDate());
        assertEquals(now, post.getDate());
        verify(postRepo, times(1)).save(post);
    }

    @Test
    void testEditPostTitle() {
        // Given
        long postId = 1;
        String newTitle = "New Title";
        Post existingPost = new Post();
        existingPost.setId(postId);
        existingPost.setTitle("Old Title");
        existingPost.setContent("Test Content");

        when(postRepo.findById(postId)).thenReturn(Optional.of(existingPost));

        // When
        boolean result = blogService.editPostTitle(postId, newTitle);

        // Then
        assertTrue(result);
        assertEquals(newTitle, existingPost.getTitle());
        verify(postRepo, times(1)).save(existingPost);
    }

    @Test
    void testEditPostContent() {
        // Given
        long postId = 1L;
        String newContent = "Updated Content";
        Post post = new Post();
        post.setId(postId);
        post.setContent("Old Content");

        when(postRepo.findById(postId)).thenReturn(Optional.of(post));

        // When
        boolean result = blogService.editPostContent(postId, newContent);

        // Then
        assertTrue(result);
        assertEquals(newContent, post.getContent());
        verify(postRepo, times(1)).save(post);
    }

    @Test
    void testAddCategory() {
        // Given
        String categoryName = "New Category";
        List<Category> existingCategories = new ArrayList<>();
        Category category1 = new Category();
        category1.setId(1L);
        category1.setName("Category 1");
        Category category2 = new Category();
        category2.setId(2L);
        category2.setName("Category 2");
        existingCategories.add(category1);
        existingCategories.add(category2);

        when(categoryRepo.findAll()).thenReturn(existingCategories);

        // When
        blogService.addCategory(categoryName);

        // Then
        ArgumentCaptor<Category> categoryCaptor = ArgumentCaptor.forClass(Category.class);
        verify(categoryRepo, times(1)).save(categoryCaptor.capture());
        Category capturedCategory = categoryCaptor.getValue();
        assertNotNull(capturedCategory);
        assertEquals(categoryName, capturedCategory.getName());

        assertEquals(3, existingCategories.size());
        assertTrue(existingCategories.stream().anyMatch(c -> c.getName().equals(categoryName)));
    }
}

