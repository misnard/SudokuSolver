var axios = require('axios');

var gridInit = [];
var tempArray = [];
var e = 1;

for ($i = 0; $i < 81; $i++) {
    tempArray.push({
        'id': $i,
        'value': ''
    });
    e++;
    if (e % 9 === 1) {
        gridInit.push(tempArray)
        tempArray = []
    }
}

console.log(gridInit)

gridInit[0][0]['value'] = '2';
gridInit[0][1]['value'] = '1';
gridInit[0][4]['value'] = '8';
gridInit[0][7]['value'] = '6';
gridInit[0][8]['value'] = '4';
gridInit[1][0]['value'] = '5';
gridInit[1][1]['value'] = '3';
gridInit[1][2]['value'] = '7';
gridInit[1][3]['value'] = '4';
gridInit[1][4]['value'] = '6';
gridInit[1][6]['value'] = '8';
gridInit[1][8]['value'] = '9';
gridInit[2][2]['value'] = '6';
gridInit[2][4]['value'] = '3';
gridInit[2][5]['value'] = '1';
gridInit[3][2]['value'] = '4';
gridInit[3][6]['value'] = '1';
gridInit[3][8]['value'] = '2';
gridInit[4][1]['value'] = '5';
gridInit[4][2]['value'] = '2';
gridInit[4][7]['value'] = '3';
gridInit[4][6]['value'] = '9';
gridInit[5][0]['value'] = '3';
gridInit[5][2]['value'] = '1';
gridInit[5][6]['value'] = '7';
gridInit[6][3]['value'] = '3';
gridInit[6][4]['value'] = '5';
gridInit[6][6]['value'] = '6';
gridInit[7][0]['value'] = '1';
gridInit[7][2]['value'] = '5';
gridInit[7][4]['value'] = '2';
gridInit[7][5]['value'] = '9';
gridInit[7][6]['value'] = '4';
gridInit[7][7]['value'] = '7';
gridInit[7][8]['value'] = '3';
gridInit[8][0]['value'] = '9';
gridInit[8][1]['value'] = '7';
gridInit[8][4]['value'] = '1';
gridInit[8][7]['value'] = '2';
gridInit[8][8]['value'] = '8';

var appVue = new Vue({
    el: '#app',
    data: {
        value: 'Hello Vue!',
        grid: gridInit
    },

    methods: {
        empty: function () {
            var tempArrayEmpty = [];
            var emtpyGrid = [];

            for ($i = 0; $i < 81; $i++) {
                tempArrayEmpty.push({
                    'id': $i,
                    'value': ''
                });
                e++;
                if (e % 9 === 1) {
                    emtpyGrid.push(tempArrayEmpty)
                    tempArrayEmpty = []
                }
            }

            appVue.grid = emtpyGrid;
        },
        submit: function () {
            isNotAllFilled = false;
            this.grid.forEach(function (block) {
                block.forEach(function (cell) {
                    if (!cell.value) {
                        isNotAllFilled = true;
                    }
                })
            })

            axios.post('http://sudoku-server.test/solve', { data: this.grid }, { contentType: 'application/json' })
            .then(function (response) {
                console.log(response);

                appVue.grid = response.data;
            })
            .catch(function (error) {
                console.log(error.message);
            });

            return isNotAllFilled;
        }
    }
})