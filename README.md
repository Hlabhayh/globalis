# Filter by age and/or eyes color
http://localhost:9000/?age=20-25&eyeColor=blue

# Test de recrutement
----
## Project setup
----
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```
### run json-server 
```
npm run api
```

### Compiles and minifies for production
```
npm run build
```
----
## Tests 
----

### Run Unit tests
```
npm run test
```

### Run E2E tests

*Avant de lancer les tests, il faut d'abord lancer l'Api.*
  
```
npm run api
npm run e2e
```
----
# Tech
  **Le script est fait en Web Composants**

- Le tableau de données est créée par javascript.
- Les headers des colonnes généré par le script est modifiable; *(le script au dessous)*

  > En ajoutant le nom du label et le nom dans lequel on trouve la proptiété l'on recherche;
  *(Dans le cas Nested en peut untiliser point ( . ) pour acceder a l'objet children d'objet parent )*


- Le code est prévu pour ajouter rapidement un nouveau filtre :
  
  > En ajoutons le nom du filtre et son type, aussi les valeurs autorisées si besoin :

    > Pour modifier les column if suffit de définir l'objet dans l'attribut column:

      - label : le nom du header;
      - name : la valeur souhaité a afficher;

      columns='[{"label":"Nom","name":"name.last"},{"label":"Prénom","name":"name.first"},{"label":"Age","name":"age"},{"label":"Couleur des yeux","name":"eyeColor"}]'
      
    > Pour modifier les filtres if suffit de définir l'objet dans l'attribut filters:

      - name : le nom de filtre;
      - type : le type de filtre : STRING, NUMBER, RANGE, BOOLEAN;
      - allowedValues : filtrer selon les valeurs autorisées;

      filters='[{"name":"age","type":"RANGE","allowedValues":["20-25","26-30","31-35","36-41"]},{"name":"eyeColor","type":"STRING","allowedValues":["blue","brown","green"]},{"name":"isActive","type":"BOOLEAN"},{"name":"Index","type":"NUMBER"}]'
    
    > Pour modifier le url du serveur dans l'attribut api-url:

      - en ajoutant l'url voulu en chaîne de caractères;
      
      api-url="http://localhost:3000/data"

```html
<filterable-table 
  columns='[{"label":"Nom","name":"name.last"},{"label":"Prénom","name":"name.first"},{"label":"Age","name":"age"},{"label":"Couleur des yeux","name":"eyeColor"}]' 
  filters='[{"name":"age","type":"RANGE","allowedValues":["20-25","26-30","31-35","36-41"]},{"name":"eyeColor","type":"STRING","allowedValues":["blue","brown","green"]}]' 
  api-url="http://localhost:3000/data">
</filterable-table>
```

- Le module minifié par minimiseur **terser-webpack-plugin**
- Le module buildé fait 2.26 KiB
- Le module buildé (**main.js**) sera crée dans le dossier dist (*dist/js/main.js*) aprés avoir lancer le build par la commande : **npm run build**
  > Pour utiliser le script, il suffit de l'appeler par script tag **< **script  src = " ** /main.js "**>** dans la partie **< head >**
  
  > Ensuit, injection de  l'element *(**Le code ci-dessus**)* dans le (**< body>**) Html
