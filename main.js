import './style.css'

const headerTemplate = () => {
  return `
  <a href="./">P</a>
  <input type="text" placeholder="Search" id="searchinput"/>
  <button id="searchbtn"><img src="https://cdn-icons-png.flaticon.com/512/639/639375.png" alt="Search icon"/></button>
    `
}

const printHeaderTemplate = () => {
  document.querySelector('header').innerHTML = headerTemplate()
}

printHeaderTemplate()

const cardTemplate = (item) => {
  return `
    <li class="gallery-item" style="background-image: url(${item.urls.regular}); border: 1px solid ${item.color}">
    <div class="info">
        <div class="save-btn">
            <button>Guardar</button>
        </div>
        <div class="links">
            <a href=${item.links.html} class="full-link">${item.links.html}</a>
            <div>
                <a href=${item.urls.full} target="_blank" class="links-icon">
                    <img src="https://cdn.icon-icons.com/icons2/1673/PNG/512/clouduploadoutline_110774.png" alt="Upload icon"/>
                </a>
                <a href="#" class="links-icon">
                    <img src="https://cdn.icon-icons.com/icons2/1875/PNG/512/plus_120249.png" alt="More icon"/>
                </a>    
            </div>
        </div>
    </div>
    </li>
    `
}

import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: 'lUsRIem0Y3-POIodkGMFUsN39sD0iu0LlsBoyt20AbE'
})
const searchPhotos = async (keyword) => {
  let images
  if (keyword === '') {
    images = await unsplash.photos.getRandom({
      query: keyword,
      page: 1,
      perPage: 30
    })
    return images
  } else {
    images = await unsplash.search.getPhotos({
      query: keyword,
      page: 1,
      perPage: 30
    })
    return images
  }
}

const galleryTemplate = () => {
  return `
    <ul class="gallery">
    </ul>
    `
}

const printItems = (items) => {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = ''
  for (const item of items) {
    gallery.innerHTML += cardTemplate(item)
  }
}

const galleryListeners = async () => {
  const input = document.querySelector('#searchinput')
  const btn = document.querySelector('#searchbtn')
  const divAlert = document.createElement('div')
  const msgSuggest = document.createElement('p')
  const divButtons = document.createElement('div')
  const suggestDateUno = document.createElement('button')
  const suggestDateTwo = document.createElement('button')
  const suggestDateThree = document.createElement('button')
  suggestDateUno.addEventListener('click', (e) => {
    input.value = suggestDateUno.textContent
  })
  suggestDateTwo.addEventListener('click', (e) => {
    input.value = suggestDateTwo.textContent
  })
  suggestDateThree.addEventListener('click', (e) => {
    input.value = suggestDateThree.textContent
  })
  btn.addEventListener('click', async () => {
    const images = await searchPhotos(input.value)
    if (input.value === '') {
      input.addEventListener('click', () => {
        btn.setAttribute('style', 'cursor:pointer')
        divAlert.innerHTML = ``
        divAlert.remove()
        input.setAttribute('style', 'border: none;')
      })
      input.setAttribute('style', 'border: 2px solid red;')
    } else if (images.response.results.length <= 0) {
      const gallery = document.querySelector('.gallery')
      const parent = gallery.parentNode
      divAlert.classList.add('alert')
      msgSuggest.textContent = `Sugerencias de busqueda:`
      suggestDateUno.textContent = `Noches oscuras`
      suggestDateTwo.textContent = `Programación`
      suggestDateThree.textContent = `Barcos`
      parent.insertBefore(divAlert, gallery)
      divAlert.append(msgSuggest, divButtons)
      divButtons.append(suggestDateUno, suggestDateTwo, suggestDateThree)
    } else {
      divAlert.remove()
      printItems(images.response.results)
    }
  })
}

const printTemplate = async () => {
  document.querySelector('main').innerHTML = galleryTemplate()
  galleryListeners()

  const images = await searchPhotos('office')
  printItems(images.response.results)
}

printTemplate()
