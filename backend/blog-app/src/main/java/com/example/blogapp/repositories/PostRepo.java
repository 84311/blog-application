package com.example.blogapp.repositories;

import com.example.blogapp.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepo extends JpaRepository<Post, Long> {
}