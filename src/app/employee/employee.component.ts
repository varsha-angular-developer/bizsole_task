import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmpService } from '../emp.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{

  list: any[] = [];

  selectedColumnValues: string[] = [];
  selectedValues: { value: string, isSelected: boolean }[] = [];
  allNames: string[] = [];
  selectedProperty: string = '';
  task: string = '';
  employeeData: any[] = [];
  selectedColumnData: any[] = [];
  selectedPropertyValues: string[] = [];
  selectedEmployee: any;
  selectedField: any;
  phoneRegex = /^(?!0+$)\d{10}$/
  searchTerm: string = '';
  filteredEmployees: any[] = [];
  employees_Data: any[] = []
  errorMsg: any = "Please fill all required field correctely."
  selectedItem: any;
  showpop: boolean = false;
  selectedValue: string | undefined;
  selectedDetail: string = '';
  selectedStates: boolean[] = new Array(this.selectedColumnValues.length).fill(false);

  constructor(private fb: FormBuilder,
    private  empSer:EmpService) { }

  ngOnInit(): void {
    this.get_emp_data()
    this.filteredColumnValues = this.selectedColumnValues;
 
  }


  employeeForm = this.fb.group({
    // sr: ['',],
    employee_Id: ['', Validators.required],
    name_Of_employee: ['', Validators.required],
    Father_Name: ['',],
    present_Address: ['',],
    Permanent_Address: ['', Validators.required],
    contact_No: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
    department: ['', Validators.required],
    designation: ['', Validators.required],
    date_of_birth: ['', Validators.required],
    date_of_joining: ['', Validators.required],
    basic_50: ['',],
    hra_40: ['',],
    conve10: [''],
    gross: ['',],
    bonus_12: ['',],
    ctc_total: ['',],
    bank_Acc_No: ['', Validators.required],
    bank_name: ['', Validators.required],
    bank_Address: ['', Validators.required],
    IFSC_Code: ['', Validators.required]
  })


  get_emp_data() {
    this.empSer.get_Employees().subscribe((resp: any) => {
      console.log(resp)
      this.employees_Data = resp;
      console.log(this.employees_Data)
      this.filteredEmployees = resp;
      console.log(this.filteredEmployees)
    })
  }

  showPopup(item: any, columnName: string) {
    console.log("item"+ item, 'c'+columnName )
    // this.filteredColumnValues = this.selectedColumnValues.slice(); 
    this.selectedColumnValues = [];
    console.log(this.selectedColumnValues)

    this.filteredEmployees.forEach(employee => {
      this.selectedColumnValues.push(employee[columnName]);
    });
    this.showpop = true;

    this.filteredColumnValues = this.selectedColumnValues.slice(); 
    console.log(
      this.filteredColumnValues )
    this.selectedCheckboxes = new Array(this.filteredColumnValues.length).fill(false);
  }
  closePopup() {
    this.showpop = false;
  }


  // getObjectKeys(obj: any): string[] {
  //   return obj ? Object.keys(obj) : [];
  // }

  sortedColumn: string = '';
  sortOrder: string = 'asc';

  sortBy(column: string) {

    if (this.sortedColumn === column && this.sortOrder === 'asc') {

      this.filteredEmployees.sort((a, b) => (a[column] < b[column] ? 1 : -1));
      this.sortOrder = 'desc';
    } else {

      this.filteredEmployees.sort((a, b) => (a[column] > b[column] ? 1 : -1));
      this.sortOrder = 'asc';
    }
    this.sortedColumn = column;
  }



  filterData() {
    if (this.searchTerm.trim() !== '') {
      this.filteredEmployees = this.employees_Data.filter(employee =>

        Object.values(employee).some((val: any) =>

          val.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    } else {
      this.searchTerm = ""
      this.filteredEmployees = this.employees_Data;
    }
  }

  submit_Form() {
    if (this.employeeForm.valid) {
      let obj = {
        // sr: ['',],
        employee_Id: this.employeeForm.value.employee_Id,
        name_Of_employee: this.employeeForm.value.name_Of_employee,
        Father_Name: this.employeeForm.value.Father_Name,
        present_Address: this.employeeForm.value.present_Address,
        Permanent_Address: this.employeeForm.value.Permanent_Address,
        contact_No: this.employeeForm.value.contact_No,
        department: this.employeeForm.value.department,
        designation: this.employeeForm.value.designation,
        date_of_birth: this.employeeForm.value.date_of_birth,
        date_of_joining: this.employeeForm.value.date_of_joining,
        basic_50: this.employeeForm.value.basic_50,
        hra_40: this.employeeForm.value.hra_40,
        conve10: this.employeeForm.value.conve10,
        gross: this.employeeForm.value.gross,
        bonus_12: this.employeeForm.value.bonus_12,
        ctc_total: this.employeeForm.value.ctc_total,
        bank_Acc_No: this.employeeForm.value.bank_Acc_No,
        bank_name: this.employeeForm.value.bank_name,
        bank_Address: this.employeeForm.value.bank_Address,
        IFSC_Code: this.employeeForm.value.IFSC_Code,
        id: ''
      }

      this.empSer.post_Employees(obj).subscribe((resp: any) => {
        console.log(resp)
      })

      this.get_emp_data()

    } else {
      alert(this.errorMsg)
      console.log(this.errorMsg)
    }
    this.get_emp_data()
  }


  abc: any
  editData(item: any) {
    this.employeeForm.patchValue({
      employee_Id: item.employee_Id,
      name_Of_employee: item.name_Of_employee,
      Father_Name: item.Father_Name,
      present_Address: item.present_Address,
      Permanent_Address: item.Permanent_Address,
      contact_No: item.contact_No,
      department: item.department,
      designation: item.designation,
      date_of_birth: item.date_of_birth,
      date_of_joining: item.date_of_joining,
      basic_50: item.basic_50,
      hra_40: item.hra_40,
      conve10: item.conve10,
      gross: item.gross,
      bonus_12: item.bonus_12,
      ctc_total: item.ctc_total,
      bank_Acc_No: item.bank_Acc_No,
      bank_name: item.bank_name,
      bank_Address: item.bank_Address,
      IFSC_Code: item.IFSC_Code,

    })
    this.abc = item
  }

  deleteData(item: any) {
    this.empSer.delete_Employees(item.id).subscribe((resp: any) => {
      console.log(resp)
    })
    this.get_emp_data()
  }

  reset_Form() {
    this.employeeForm.reset()

  }
  selectedCheckboxes: boolean[] = [];
  onSubmit()
  {
      alert("Data Submit Successfully...")
    
        this.filteredEmployees = [];

        for (let i = 0; i < this.selectedCheckboxes.length; i++) {

            if (this.selectedCheckboxes[i]) {
                this.filteredEmployees.push(this.employees_Data[i]);
            }
        }

     
        this.closePopup();
    }
  

  selectAllChecked: boolean = false;

  
  toggleSelectAll() {
    this.selectedCheckboxes = this.selectedCheckboxes.map(() => this.selectAllChecked);
}

  searchText: string = '';
  filteredColumnValues: string[] = [];

 



  filterColumnValues() {
      // this.filteredColumnValues = this.selectedColumnValues.filter(value =>
      //     value.toLowerCase().includes(this.searchText.toLowerCase())
      // );
   
      if (this.searchText.trim() == '') {
        
        this.filteredColumnValues = this.selectedColumnValues;
    } else {
       
        this.filteredColumnValues = this.selectedColumnValues.filter(value =>
            value.toLowerCase().includes(this.searchText.toLowerCase())
        );
    }
  }

 

  removeSelectedCheckbox() {

    this.filteredEmployees = this.employees_Data; 
    this.closePopup()
  }
  


}
