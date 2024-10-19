package com.example.todo_backend.controller;

import com.example.todo_backend.model.Todo;
import com.example.todo_backend.repository.TodoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.UUID;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("Test")
class TodoControllerIntegrationTest {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp(){
        todoRepository.deleteAll();
    }

    @Test
    public void shouldGetAllTodos() throws Exception {
        Todo todo1 = new Todo(UUID.randomUUID().toString(), "Test Task 1", "Description 1", true);
        Todo todo2 = new Todo(UUID.randomUUID().toString(), "Test Task 2", "Description 2", false);

        todoRepository.save(todo1);
        todoRepository.save(todo2);

        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].title", is(todo1.getTitle())))
                .andExpect(jsonPath("$[1].title", is(todo2.getTitle())));
    }


    @Test
    public void shouldCreateTodo() throws Exception {
        Todo todo = new Todo();
        todo.setTitle("Test Task 1");
        todo.setDescription("Description 1");
        todo.setCompleted(true);

        String todoJson = objectMapper.writeValueAsString(todo);

        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(todoJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title", is(todo.getTitle())));


        List<Todo> todos = todoRepository.findAll();
        Assertions.assertEquals(1, ((List<?>) todos).size());
        Assertions.assertEquals("Test Task 1", todos.get(0).getTitle());
    }

    @Test
    public void shouldUpdateTask() throws Exception {
        Todo todo = new Todo(UUID.randomUUID().toString(), "Test Task 1", "Description 1", false);
        Todo savedTodo = todoRepository.save(todo);

        Todo updatedTodo = new Todo(savedTodo.getId(), "Updated Task 1", "Updated Description", false);
        String updatedTodoJson = objectMapper.writeValueAsString(updatedTodo);

        mockMvc.perform(put("/api/tasks/{id}", savedTodo.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedTodoJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is(updatedTodo.getTitle())))
                .andExpect(jsonPath("$.description", is(updatedTodo.getDescription())))
                .andExpect(jsonPath("$.completed", is(updatedTodo.isCompleted())));
    }


    @Test
    public void shouldGetTaskById() throws Exception{
        Todo todo = new Todo(UUID.randomUUID().toString(), "Test Task 1", "Description 1", true);
        Todo savedTodo = todoRepository.save(todo);

        mockMvc.perform(get("/api/tasks/{id}", savedTodo.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is(savedTodo.getTitle())))
                .andExpect(jsonPath("$.description", is(savedTodo.getDescription())))
                .andExpect(jsonPath("$.completed", is(savedTodo.isCompleted())));
    }
}
