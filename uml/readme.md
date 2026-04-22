# Webzapper UML

Diagrams for this project is created with the free UMLet software.

- All void return types are implied to avoid verbosity. Return type is always void unless otherwise noted.
- The diagrams use a simplified, non-standard UML syntax to denote identical types of a class. This syntax works by removing repeating type declarations and instead grouping variable declarations with the same type, ie.:

`Element(id : string, className : string, type : string, enabled : boolean)`

becomes:

`Element(id, className, type : string, enabled : boolean)`
