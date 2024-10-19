package com.example.todo_backend.controller;

import com.example.todo_backend.model.Todo;
import com.example.todo_backend.repository.TodoRepository;
import com.example.todo_backend.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private TodoService todoService;

    @GetMapping
    public List<Todo> getAllTodos() {
        System.out.println("Tasks listed");
        return todoRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Todo createTodo(@RequestBody Todo todo) {
        System.out.println("Task created");
        todo.setId(UUID.randomUUID().toString());
        return todoRepository.save(todo);
    }


    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable String id) {
        System.out.println("Task deleted");
        todoRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Todo getTaskById(@PathVariable String id) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);
        System.out.println("Task found");
        return optionalTodo.orElse(null);
    }

    @PutMapping("/{id}")
    public Todo updateTask(@PathVariable String id, @RequestBody Todo todoDetails) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);
        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();
            todo.setTitle(todoDetails.getTitle());
            todo.setDescription(todoDetails.getDescription());
            todo.setCompleted(todoDetails.isCompleted());
            System.out.println("Task updated");
            return todoRepository.save(todo);
        } else {
            return null;
        }
    }
}
