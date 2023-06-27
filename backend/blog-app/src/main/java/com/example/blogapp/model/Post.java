package com.example.blogapp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.READ_ONLY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @JsonProperty(access = READ_ONLY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @JsonProperty(access = READ_ONLY)
    private LocalDateTime date;

    private PostType postType;
}
