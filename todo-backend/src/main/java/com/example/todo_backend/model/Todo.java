package com.example.todo_backend.model;

import lombok.Generated;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Setter
@Getter
@Document(collection = "Tasks")
public class Todo {

    @Id
    private String id;
    private String title;
    private String description;
    private boolean completed;

    public Todo(String id,String title,String description,boolean completed) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    public Todo() {
    }

}
