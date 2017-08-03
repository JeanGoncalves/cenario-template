<template>
  <div>
    <div>

      <v-layout row style="position: relative;">
        <v-dialog v-model="dialog" lazy absolute>
          <v-btn primary dark slot="activator">+</v-btn>
          <v-card>
            <v-card-title>
              <div class="headline">Descreva os detalhes:</div>
            </v-card-title>
            <v-card-text>
              <v-layout row>
                <v-flex xs8>
                  <v-subheader>Quantas fileiras?</v-subheader>
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    v-model="row"
                    min="1"
                    type="number"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs8>
                  <v-subheader>Quantas poltronas por fileira?</v-subheader>
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    v-model="column"
                    min="1"
                    type="number"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Cancelar</v-btn>
              <v-btn class="green--text darken-1" flat="flat" @click.native="CreateObject">Criar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      
      <canvas id="c"></canvas>

    </div>
  </div>
</template>

<script>
  const fabric = require('fabric').fabric

  export default {
    name: 'fabric',
    data: function () {
      let canvas
      return {
        dialog: false,
        row: 1,
        column: 1,
        CreateObject: function () {
          this.dialog = false

          if (!canvas) {
            canvas = new fabric.Canvas('c', { width: 900, height: 600 })
          }

          var group = []
          for (var i = 0; i < this.row; i++) {
            group.push(renderText(i, -20, i * 20))
            group.push(renderText(i, (this.column * 20), i * 20))

            for (var j = 0; j < this.column; j++) {
              group.push(renderRect(j * 20, i * 20))
            }
          }

          let groupConfig = {
            left: 20,
            hasControls: true,
            hasRotatingPoint: true,
            transparentCorners: false,
            rotatingPointOffset: 50
          }
          var objectGroup = new fabric.Group(group, groupConfig)
          canvas.add(objectGroup)
        }
      }
    }
  }

  function renderRect (pLeft, pTop) {
    let rectConfig = {
      width: 20,
      height: 20,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 2,
      left: pLeft,
      top: pTop
    }
    return new fabric.Rect(rectConfig)
  }

  function renderText (pText, pLeft, pTop) {
    let textConfig = {
      textAlign: 'center',
      fontSize: 14,
      width: 20,
      height: 20,
      left: pLeft + 5,
      top: pTop + 2
    }
    return new fabric.Text(getLetter(pText), textConfig)
  }

  function getLetter (pNumber) {
    var alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (pNumber < alfabeto.length) {
      return alfabeto[pNumber]
    } else {
      // Lógica para quando houver mais fileiras que o tamanho do alfabeto
    }
  }
</script>
