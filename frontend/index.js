let devsDiv = document.createElement("div");
let devsCouterDiv = document.querySelector(".counter")
let devList = [];
let devsCouter = 0;
const container = document.querySelector(".container");
const filtersDiv = document.querySelector(".filter-sec");
const nameInput = document.querySelector("#nameInput");

const jsInput = document.querySelector("#javascript");
const javaInput = document.querySelector("#java");
const pyInput = document.querySelector("#python");

const javaIcon = document.querySelector(".fa-java")
const jsIcon = document.querySelector(".fa-js")
const pyIcon = document.querySelector(".fa-python")

const andInput = document.querySelector("#and");

const initFunc = () => {
  nameInput.focus();
  initEvents();
  const elements = document.querySelectorAll(".search");
  addEventListenerAll("input", elements);

  fetchData();
};

const toggleFillIcons = (input, icon) => {
  nameInput.focus();
  if(input.checked){
    icon.classList.add("colored-icon")
  }else{
    icon.classList.remove("colored-icon")
  }
};

const initEvents = () => {
  toggleFillIcons(javaInput, javaIcon);
  toggleFillIcons(jsInput, jsIcon);
  toggleFillIcons(pyInput, pyIcon);

  javaInput.addEventListener("input", () => {toggleFillIcons(javaInput, javaIcon)})
  
  jsInput.addEventListener("input", () => (toggleFillIcons(jsInput, jsIcon)))
  
  pyInput.addEventListener("input", () => {toggleFillIcons(pyInput, pyIcon)})

};

const addEventListenerAll = (event, elements) => {
  elements.forEach((el) => {
    el.addEventListener(event, () => {
      createElements(filterController(devList));
    })
  })
};

const filterText = (list) => {
  const filteredTextList = list.filter(dev => {
    return dev.slug.match(nameInput.value)
  })
  return filteredTextList;
};

const filterOr = (list, languagesOnFilter) => {
  const inArray = ({ language }) => {
    return languagesOnFilter.includes(language);
  };
  const orFilteredList = list.filter(({ languages }) => {
    return languages.some(inArray);
  });
  return orFilteredList;
};

const filterAnd = (list, languagesOnFilter) => {
  const andFilteredList = list.filter(dev => {
    const langs = dev.languages.map(lang => lang.language)

    langs.sort();
    const str1 = langs.toString();
    languagesOnFilter.sort();
    const str2 = languagesOnFilter.toString();

    return (str1 == str2)
  })
  return andFilteredList;
};

const arrayFilter = () => {
  const languagesOnFilter = [];
  if(jsInput.checked){
    languagesOnFilter.push(jsInput.name)
  }
  if(javaInput.checked){
    languagesOnFilter.push(javaInput.name)
  }
  if(pyInput.checked){
    languagesOnFilter.push(pyInput.name)
  }
  return languagesOnFilter;
};

const filterController = list => {

  const newList = filterText(list);
  
  switch (andInput.checked) {
    case true:
      return filterAnd(newList, arrayFilter());
    case false:
      return filterOr(newList, arrayFilter());
    default:
      break;
  }
};

function slugify(str)
{
    str = str.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '') 
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '') 
    // Collapse dashes
    .replace(/-+/g, ''); 

    return str;
};

const fetchData = () => {

  const mapedData = Lista.map((dev)=>{
    return{
      slug: slugify(dev.name),
      name: dev.name,
      photo: dev.picture,
      languages: dev.programmingLanguages
    }
  })
  devList = mapedData;
  createElements(filterController(devList)); 
};

const createElements = (list) => { 
  devsDiv.innerHTML = "";
  devsDiv.classList.add("row")
  devsCouter = 0;

  list.forEach(({name, photo, languages}) => {
    
    ++devsCouter;

    const devDiv = document.createElement("div");
    devDiv.classList.add("col-6")
    devDiv.classList.add("col-md-3")
    devDiv.innerHTML = `
      <div class="card mb-4 shadow-sm">
        <img class="card-img-top" src="${photo}">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <div class="card-text">${createLanguagesList(languages)}</div>
        </div>
      </div>
      `
    
    devsDiv.appendChild(devDiv);
  });
  devsCouterDiv.innerHTML = `<div class="alert alert-dark" role="alert" ><strong>${devsCouter}</strong> dev(s) encontrado(s)</div>`;
  container.appendChild(devsDiv);
};

const createLanguagesList = (plist) => {
  let languagesList = ""
  plist.forEach(({ language }) => {

    switch (language) {
      case "Java":
        languagesList += `
        <i class="fab fa-3x fa-java pl-ico"></i>
        `
        break;
      case "JavaScript":
        languagesList += `
        <i class="fab fa-3x fa-js pl-ico"></i>
        `
        break;
      case "Python":
        languagesList += `
        <i class="fab fa-3x fa-python pl-ico"></i>
        `
        break;
      default:
        break;
    }
  })
  return languagesList;
};

initFunc();