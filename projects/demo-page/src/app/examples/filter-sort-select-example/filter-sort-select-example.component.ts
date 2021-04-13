import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.008, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026022, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.94, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.01218315, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.81, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.011, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.007, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.999, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984031636, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.17976, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.989769282, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminium', weight: 26.98153857, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.085, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9737619985, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.06, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.45, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.9481, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.09831, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.0784, symbol: 'Ca' },
  { position: 21, name: 'Scandium', weight: 44.9559085, symbol: 'Sc' },
  { position: 22, name: 'Titanium', weight: 47.8671, symbol: 'Ti' },
  { position: 23, name: 'Vanadium', weight: 50.94151, symbol: 'V' },
  { position: 24, name: 'Chromium', weight: 51.99616, symbol: 'Cr' },
  { position: 25, name: 'Manganese', weight: 54.9380443, symbol: 'Mn' },
  { position: 26, name: 'Iron', weight: 55.8452, symbol: 'Fe' },
  { position: 27, name: 'Cobalt', weight: 58.9331944, symbol: 'Co' },
  { position: 28, name: 'Nickel', weight: 58.69344, symbol: 'Ni' },
  { position: 29, name: 'Copper', weight: 63.5463, symbol: 'Cu' },
  { position: 30, name: 'Zinc', weight: 65.382, symbol: 'Zn' },
  { position: 31, name: 'Gallium', weight: 69.7231, symbol: 'Ga' },
  { position: 32, name: 'Germanium', weight: 72.6308, symbol: 'Ge' },
  { position: 33, name: 'Arsenic', weight: 74.9215956, symbol: 'As' },
  { position: 34, name: 'Selenium', weight: 78.9718, symbol: 'Se' },
  { position: 35, name: 'Bromine', weight: 79.904, symbol: 'Br' },
  { position: 36, name: 'Krypton', weight: 83.7982, symbol: 'Kr' },
  { position: 37, name: 'Rubidium', weight: 85.46783, symbol: 'Rb' },
  { position: 38, name: 'Strontium', weight: 87.621, symbol: 'Sr' },
  { position: 39, name: 'Yttrium', weight: 88.905842, symbol: 'Y' },
  { position: 40, name: 'Zirconium', weight: 91.2242, symbol: 'Zr' },
  { position: 41, name: 'Niobium', weight: 92.906372, symbol: 'Nb' },
  { position: 42, name: 'Molybdenum', weight: 95.951, symbol: 'Mo' },
  { position: 43, name: 'Technetium', weight: 98, symbol: 'Tc' },
  { position: 44, name: 'Ruthenium', weight: 101.072, symbol: 'Ru' },
  { position: 45, name: 'Rhodium', weight: 102.905502, symbol: 'Rh' },
  { position: 46, name: 'Palladium', weight: 106.421, symbol: 'Pd' },
  { position: 47, name: 'Silver', weight: 107.86822, symbol: 'Ag' },
  { position: 48, name: 'Cadmium', weight: 112.4144, symbol: 'Cd' },
  { position: 49, name: 'Indium', weight: 114.8181, symbol: 'In' },
  { position: 50, name: 'Tin', weight: 118.7107, symbol: 'Sn' },
  { position: 51, name: 'Antimony', weight: 121.7601, symbol: 'Sb' },
  { position: 52, name: 'Tellurium', weight: 127.603, symbol: 'Te' },
  { position: 53, name: 'Iodine', weight: 126.904473, symbol: 'I' },
  { position: 54, name: 'Xenon', weight: 131.2936, symbol: 'Xe' },
  { position: 55, name: 'Cesium', weight: 132.905451966, symbol: 'Cs' },
  { position: 56, name: 'Barium', weight: 137.3277, symbol: 'Ba' },
  { position: 57, name: 'Lanthanum', weight: 138.905477, symbol: 'La' },
  { position: 58, name: 'Cerium', weight: 140.1161, symbol: 'Ce' },
  { position: 59, name: 'Praseodymium', weight: 140.907662, symbol: 'Pr' },
  { position: 60, name: 'Neodymium', weight: 144.2423, symbol: 'Nd' },
  { position: 61, name: 'Promethium', weight: 145, symbol: 'Pm' },
  { position: 62, name: 'Samarium', weight: 150.362, symbol: 'Sm' },
  { position: 63, name: 'Europium', weight: 151.9641, symbol: 'Eu' },
  { position: 64, name: 'Gadolinium', weight: 157.253, symbol: 'Gd' },
  { position: 65, name: 'Terbium', weight: 158.925352, symbol: 'Tb' },
  { position: 66, name: 'Dysprosium', weight: 162.5001, symbol: 'Dy' },
  { position: 67, name: 'Holmium', weight: 164.930332, symbol: 'Ho' },
  { position: 68, name: 'Erbium', weight: 167.2593, symbol: 'Er' },
  { position: 69, name: 'Thulium', weight: 168.934222, symbol: 'Tm' },
  { position: 70, name: 'Ytterbium', weight: 173.0451, symbol: 'Yb' },
  { position: 71, name: 'Lutetium', weight: 174.96681, symbol: 'Lu' },
  { position: 72, name: 'Hafnium', weight: 178.492, symbol: 'Hf' },
  { position: 73, name: 'Tantalum', weight: 180.947882, symbol: 'Ta' },
  { position: 74, name: 'Tungsten', weight: 183.841, symbol: 'W' },
  { position: 75, name: 'Rhenium', weight: 186.2071, symbol: 'Re' },
  { position: 76, name: 'Osmium', weight: 190.233, symbol: 'Os' },
  { position: 77, name: 'Iridium', weight: 192.2173, symbol: 'Ir' },
  { position: 78, name: 'Platinum', weight: 195.0849, symbol: 'Pt' },
  { position: 79, name: 'Gold', weight: 196.9665695, symbol: 'Au' },
  { position: 80, name: 'Mercury', weight: 200.5923, symbol: 'Hg' },
  { position: 81, name: 'Thallium', weight: 204.38, symbol: 'Tl' },
  { position: 82, name: 'Lead', weight: 207.21, symbol: 'Pb' },
  { position: 83, name: 'Bismuth', weight: 208.980401, symbol: 'Bi' },
  { position: 84, name: 'Polonium', weight: 209, symbol: 'Po' },
  { position: 85, name: 'Astatine', weight: 210, symbol: 'At' },
  { position: 86, name: 'Radon', weight: 222, symbol: 'Rn' },
  { position: 87, name: 'Francium', weight: 223, symbol: 'Fr' },
  { position: 88, name: 'Radium', weight: 226, symbol: 'Ra' },
  { position: 89, name: 'Actinium', weight: 227, symbol: 'Ac' },
  { position: 90, name: 'Thorium', weight: 232.03774, symbol: 'Th' },
  { position: 91, name: 'Protactinium', weight: 231.035882, symbol: 'Pa' },
  { position: 92, name: 'Uranium', weight: 238.028913, symbol: 'U' },
  { position: 93, name: 'Neptunium', weight: 237, symbol: 'Np' },
  { position: 94, name: 'Plutonium', weight: 244, symbol: 'Pu' },
  { position: 95, name: 'Americium', weight: 243, symbol: 'Am' },
  { position: 96, name: 'Curium', weight: 247, symbol: 'Cm' },
  { position: 97, name: 'Berkelium', weight: 247, symbol: 'Bk' },
  { position: 98, name: 'Californium', weight: 251, symbol: 'Cf' },
  { position: 99, name: 'Einsteinium', weight: 252, symbol: 'Es' },
  { position: 100, name: 'Fermium', weight: 257, symbol: 'Fm' },
  { position: 101, name: 'Mendelevium', weight: 258, symbol: 'Md' },
  { position: 102, name: 'Nobelium', weight: 259, symbol: 'No' },
  { position: 103, name: 'Lawrencium', weight: 266, symbol: 'Lr' },
  { position: 104, name: 'Rutherfordium', weight: 267, symbol: 'Rf' },
  { position: 105, name: 'Dubnium', weight: 268, symbol: 'Db' },
  { position: 106, name: 'Seaborgium', weight: 269, symbol: 'Sg' },
  { position: 107, name: 'Bohrium', weight: 270, symbol: 'Bh' },
  { position: 108, name: 'Hassium', weight: 269, symbol: 'Hs' },
  { position: 109, name: 'Meitnerium', weight: 278, symbol: 'Mt' },
  { position: 110, name: 'Darmstadtium', weight: 281, symbol: 'Ds' },
  { position: 111, name: 'Roentgenium', weight: 282, symbol: 'Rg' },
  { position: 112, name: 'Copernicium', weight: 285, symbol: 'Cn' },
  { position: 113, name: 'Nihonium', weight: 286, symbol: 'Nh' },
  { position: 114, name: 'Flerovium', weight: 289, symbol: 'Fl' },
  { position: 115, name: 'Moscovium', weight: 289, symbol: 'Mc' },
  { position: 116, name: 'Livermorium', weight: 293, symbol: 'Lv' },
  { position: 117, name: 'Tennessine', weight: 294, symbol: 'Ts' },
  { position: 118, name: 'Oganesson', weight: 294, symbol: 'Og' },
  { position: 119, name: 'Ununennium', weight: 315, symbol: 'Uue' }
];

@Component({
  selector: 'app-filter-sort-select-example',
  templateUrl: './filter-sort-select-example.component.html',
  styleUrls: ['./filter-sort-select-example.component.css']
})
export class FilterSortSelectExampleComponent implements OnInit {

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new TableVirtualScrollDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
