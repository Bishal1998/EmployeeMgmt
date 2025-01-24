package com.employee.ems_backend.service;

import com.employee.ems_backend.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeId(Long employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(EmployeeDto employeeDto, Long employeeId);
}
