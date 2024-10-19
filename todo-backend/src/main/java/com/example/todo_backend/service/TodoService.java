package com.example.todo_backend.service;

import com.example.todo_backend.model.Todo;
import com.example.todo_backend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    @Autowired
    private  TodoRepository todoRepository;

    public List<Todo> findAll() {
        return todoRepository.findAll();
    }
    public  Todo findById(int id) {
        return todoRepository.findById(String.valueOf(id)).orElse(null);
    }

    public  Todo save(Todo todo) {
        return todoRepository.save(todo);
    }

    public void delete(Todo todo) {
        todoRepository.delete(todo);
    }

}
