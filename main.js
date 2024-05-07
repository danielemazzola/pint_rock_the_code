import './style.css'

const headerTemplate = () => {
  return `
  <h1>P</h1>
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
    <li class="gallery-item" style="background-image: url(${item.urls.regular}); border: 3px solid ${item.color}">
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
  accessKey: 'IqsMfzMZ9ZfbHlwusPFS7Zx8y1IN_eEGlDtIX_iSQKI'
})

const searchPhotos = async (keyword) => {
  const images = await unsplash.search.getPhotos({
    query: keyword,
    page: 1,
    perPage: 30
  })
  return images
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
  btn.addEventListener('click', async () => {
    const images = await searchPhotos(input.value)
    printItems(images.response.results)
  })
}

const printTemplate = async () => {
  document.querySelector('main').innerHTML = galleryTemplate()
  galleryListeners()

  const images = await searchPhotos('dev')
  printItems(images.response.results)
}

printTemplate()
