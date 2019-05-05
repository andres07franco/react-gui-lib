# react-gui-lib

> React components for web apps

[![NPM](https://img.shields.io/npm/v/react-gui-lib.svg)](https://www.npmjs.com/package/react-gui-lib) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-gui-lib
```

## Usage

# Indice 

* &lt;ActionBar /&gt;
* &lt;ActionBarHeader /&gt; 
* &lt;ActionBarContent /&gt; 
* Componente ActionButtom /&gt; 
* Componente MessageFilter
* Componente LoadingBar
* Componente Table
* Componente Paginator
* Componente Modal
* Componente MessageALert
* Componente Autocomplete
* Componente SearchLookup
* Componente Form
* Componente FormRow
* Componente Field
* Componente Button

## 1. &lt;ActionBar /&gt;

### Descripción
Este componete mustra una barra de acciones, comumente usado para colocar botones que emiten acciones globales y formulario para filtradao de información.

### Propiedades

Este componente no posee parametros o propeidades de entrada.

### Componentes Hijos

1. **ActionBarHeader:** Cabecera del barra de acción, aquí se debe colocar los botones de acción. Esté componete es obligatorio.
2. **ActionBarContent:** Es el coentenido de la barra de acciín, por lo gneral lleva un formulario para filtrar datos. Esté componete no es obligatorio.

*Nota: Esté complemente debe tener  un ActionHeaderBar*

### Ejemplos
    
```javascript
    import {
        ActionBar,
    } from 'react-ui-lite'

    const FilterPanel = () =>(<ActionBar></ActionBar>)

    export default FilterPanel
```

## 2. &lt;ActionBarHeader /&gt; 
### Descripcióm
Este componente despliga una baarra de acciones, comumnete se utilizar para colocar botones que realizan acciones globales.

### Propiedades

|Name|PropType|Description|
|---|---|---|
|hideQuickFilter|PropTypes.string| Inidica se se debe mostrar o ocultar la bsuqueda rapida
|quickSearchRef|PropTypes.Func|Devuelve la reerencia del input de la busqueda raída
|handleExpandContent|PropTypes.Func|Se usa para manejar el estado del hijo en el padre 

## Ejemplo

```javascript
    import {
        ActionBar,
        ActionBarHeader
    } from 'react-ui-lite'

    const FilterPanel = () => (
        <ActionBar>
            <ActionBarHeader>
                /* aqui los botones */
            </ActionBarHeader>
        </ActionBar>
    )

    export default FilterPanel
```

## 2. &lt;ActionBarContent /&gt; 
### Descripcióm
Este componente despliga una baarra de acciones, comumnete se utilizar para colocar botones que realizan acciones globales.

### Propiedades

|Name|PropType|Description|
|---|---|---|
|hideQuickFilter|PropTypes.string| Inidica se se debe mostrar o ocultar la bsuqueda rapida

## License

MIT © [andres07franco@gmail.com](https://github.com/andres07franco@gmail.com)
