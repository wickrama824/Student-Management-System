package com.studentmanagement.service;

import com.studentmanagement.entity.Student;
import com.studentmanagement.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    // Create Student
    public Student saveStudent(Student student) {
        return repository.save(student);
    }

    // Get All Students
    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    // Update Student
    public Student updateStudent(Long id, Student student) {

        Student existingStudent =
                repository.findById(id).orElse(null);

        if (existingStudent != null) {

            existingStudent.setName(student.getName());
            existingStudent.setEmail(student.getEmail());
            existingStudent.setCourse(student.getCourse());

            return repository.save(existingStudent);
        }

        return null;
    }
    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }
}