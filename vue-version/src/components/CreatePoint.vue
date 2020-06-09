<template>
    <div id="page-create-point">
        <div id="page-create-point">
            <header>
                <img src="../assets/logo.svg" alt="Ecoleta" />
                <router-link to="/">
                    <ArrowLeftIcon />
                    Voltar para home
                </router-link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do<br/>ponto de coleta</h1>

                <!-- <Dropzone onFileUploaded={setSelectedFile}></Dropzone> -->

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div class="field">
                        <label for="name">Nome da entidade</label>
                        <input type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div class="field-group">
                        <div class="field">
                            <label for="email">E-mail</label>
                            <input type="text"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div class="field">
                            <label for="whatsapp">Whatsapp</label>
                            <input type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <!-- <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer 
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={selectedPosition} />
                    </Map> -->

                    <div class="field-group">
                        <div class="field">
                            <label for="uf">Estado (UF)</label>
                            <select name="uf" id="uf" :value="selectedUf" @change="changeUF">
                                <option value="0">Selecione uma UF</option>
                                    <option v-for="estado in uf" :key="estado.sigla" :value='estado.sigla'>
                                        {{estado.sigla}}
                                    </option>
                            </select>
                        </div>
                        <div class="field">
                            <label for="city">Cidade</label>
                            <select name="city" id="city" :value="selectedCity" @change="changeCity">
                                <option value="0">Selecione uma cidade</option>
                                <option v-for="city in cities" :key="city.nome" :value='city.nome'>
                                    {{city.nome}}
                                </option>
                            </select>
                        </div>
                    </div>
                </fieldset>


                <fieldset>
                    <legend>
                        <h2>Itens de Coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                    <ul class="items-grid">
                        <li
                            v-for="item in items"
                            :key="item.id"
                            @click="clickedItem(item.id)"
                            :class="{ 'selected': selectedItems.includes(item.id) }">
                            <img :src="item.image_url" :alt="item.title"/>
                            <span>{{ item.title }}</span>
                        </li>
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>

            </form> 
        </div>
    </div>
</template>

<script>
import { ArrowLeftIcon } from 'vue-feather-icons'
import axios from 'axios'
import api from '../services/api'

export default {
    components: { ArrowLeftIcon },
    data() {
        return {
            selectedUf: 0,
            uf: [],
            selectedCity: 0,
            cities: [],
            selectedItems: [],
            items: 0
        }
    },
    created() {
        this.getUF()
        this.getItems()
    },
    methods: {
        getUF(){
            axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
                this.uf = res.data.sort(function(a, b){
                    return a.sigla < b.sigla ? -1 : 1
                })
            })
        },

        getItems(){
            api.get('items').then(res => {
                this.items = res.data
            })
        },

        changeUF(event){
            const uf = event.target.value
            this.selectedUf = uf

            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then(res => {
                this.cities = res.data
            })    
        },

        changeCity(event){
            const city = event.target.value
            this.selectedCity = city
        },

        clickedItem(id){
            if(this.selectedItems.includes(id)){
                const index = this.selectedItems.indexOf(id);
                this.selectedItems.splice(index, 1)
            } else {
                this.selectedItems.push(id)
            }
        }
    },

}
</script>

<style>
#page-create-point {
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;
}

#page-create-point header {
  margin-top: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

#page-create-point header a {
  color: var(--title-color);
  font-weight: bold;
  text-decoration: none;

  display: flex;
  align-items: center;
}

#page-create-point header a svg {
  margin-right: 16px;
  color: var(--primary-color);
}

#page-create-point form {
  margin: 80px auto;
  padding: 64px;
  max-width: 730px;
  background: #fff;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
}

#page-create-point form h1 {
  font-size: 36px;
}

#page-create-point form fieldset {
  margin-top: 64px;
  min-inline-size: auto;
  border: 0;
}

#page-create-point form legend {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

#page-create-point form legend h2 {
  font-size: 24px;
}

#page-create-point form legend span {
  font-size: 14px;
  font-weight: normal;
  color: var(--text-color);
}

#page-create-point form .field-group {
  flex: 1;
  display: flex;
}

#page-create-point form .field {
  flex: 1;

  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}

#page-create-point form .field input[type="text"],
#page-create-point form .field input[type="email"],
#page-create-point form .field input[type="number"] {
  flex: 1;
  background: #f0f0f5;
  border-radius: 8px;
  border: 0;
  padding: 16px 24px;
  font-size: 16px;
  color: #6c6c80;
}

#page-create-point form .field select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  flex: 1;
  background: #f0f0f5;
  border-radius: 8px;
  border: 0;
  padding: 16px 24px;
  font-size: 16px;
  color: #6c6c80;
}

#page-create-point form .field input::placeholder {
  color: #a0a0b2;
}

#page-create-point form .field label {
  font-size: 14px;
  margin-bottom: 8px;
}

#page-create-point form .field :disabled {
  cursor: not-allowed;
}

#page-create-point form .field-group .field + .field {
  margin-left: 24px;
}

#page-create-point form .field-group input + input {
  margin-left: 24px;
}

#page-create-point form .field-check {
  flex-direction: row;
  align-items: center;
}

#page-create-point form .field-check input[type="checkbox"] {
  background: #f0f0f5;
}

#page-create-point form .field-check label {
  margin: 0 0 0 8px;
}

#page-create-point form .leaflet-container {
  width: 100%;
  height: 350px;
  border-radius: 8px;
  margin-bottom: 24px;
}

#page-create-point form button {
  width: 260px;
  height: 56px;
  background: var(--primary-color);
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  border: 0;
  align-self: flex-end;
  margin-top: 40px;
  transition: background-color 0.2s;
  cursor: pointer;
}

#page-create-point form button:hover {
  background: #2fb86e;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  list-style: none;
}

.items-grid li {
  background: #f5f5f5;
  border: 2px solid #f5f5f5;
  height: 180px;
  border-radius: 8px;
  padding: 32px 24px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  text-align: center;

  cursor: pointer;
}

.items-grid li span {
  flex: 1;
  margin-top: 12px;

  display: flex;
  align-items: center;
  color: var(--title-color);
}

.items-grid li.selected {
  background: #e1faec;
  border: 2px solid #34cb79;
}

.confirmation {
  z-index: 1000;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
}

.confirmation svg{
    flex-basis: 150px;
  }
  
.confirmation .negative {
    color: #ff3b3b;
}

.confirmation .confirm {
  color: #2fb86e;
}

.confirmation h1 {
  color: rgb(199, 199, 199);
}

.confirmation a {
  width: 25vw;
  max-width: 360px;
  height: 55px;
  background: var(--primary-color);
  border-radius: 8px;
  text-decoration: none;

  display: flex;
  align-items: center;
  overflow: hidden;

  cursor: pointer;
  margin-top: 40px;
}

.confirmation a span {
  display: block;
  background: rgba(0, 0, 0, 0.08);
  width: 72px;
  height: 72px;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.confirmation a span svg {
  color: #FFF;
  width: 20px;
  height: 20px;
}

.confirmation a strong {
  flex: 1;
  text-align: center;
  color: #FFF;
}

.confirmation a:hover {
  background: #2FB86E;
}

</style>