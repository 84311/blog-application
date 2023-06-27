package com.example.blogapp;

import com.example.blogapp.model.dtos.BlogDataDTO;
import com.example.blogapp.repositories.CategoryRepo;
import com.example.blogapp.repositories.PostRepo;
import com.google.gson.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
@Component
@Transactional
public class StartConfig implements CommandLineRunner {
    private final PostRepo postRepo;
    private final CategoryRepo categoryRepo;

    @Override
    public void run(String... args) {
        try {
            String json = IOUtils.resourceToString("/initial_data.json", StandardCharsets.UTF_8);

            Gson gson = new GsonBuilder()
                    .registerTypeAdapter(LocalDateTime.class,
                            new LocalDateTimeAdapter(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")))
                    .create();

            BlogDataDTO initialBlogData = gson.fromJson(json, BlogDataDTO.class);
            categoryRepo.saveAll(initialBlogData.getCategories());
            postRepo.saveAll(initialBlogData.getPosts());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private record LocalDateTimeAdapter(DateTimeFormatter formatter) implements JsonDeserializer<LocalDateTime> {
        @Override
        public LocalDateTime deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
                throws JsonParseException {
            String dateString = json.getAsString();
            return LocalDateTime.parse(dateString, formatter);
        }
    }
}
