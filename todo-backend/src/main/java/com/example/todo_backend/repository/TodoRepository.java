package com.example.todo_backend.repository;

import com.example.todo_backend.model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoRepository extends MongoRepository<Todo, String> {



}
