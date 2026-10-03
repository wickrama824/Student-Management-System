package com.studentmanagement.controller;

import com.studentmanagement.entity.Student;
import com.studentmanagement.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return service.saveStudent(student);
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }
    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        return service.updateStudent(id, student);
    }
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {

        service.deleteStudent(id);

        return "Student deleted successfully";
    }
}
