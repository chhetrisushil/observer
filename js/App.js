/**
 * @filename: App
 * @author: schhetri
 * @date: 04/08/13
 * @time: 3:52 AM
 */
(function (W, U) {
    var list = Define({value: ''}),
        ul = $('<ul />'),
        ul1 = $('<ul />'),
        input, input1;

    list.Observe('value', function (value) {
        ul.append($('<li />').html('<b>'+value+'</b>'));
    });
    list.Observe('value', function (value, oldVal) {
        console.log(value, oldVal);
        ul1.append($('<li />').html('dusra hai <b>'+value+'</b>'));
    });

    input = $('<input />', {
        placeholder: 'Enter text to add to the list below',
        keypress: function (e) {
            if (e.which === 13) {
                list('value', this.value);
                this.value = '';
            }
        }
    });

    input1 = $('<input />', {
        placeholder: 'Enter text to add to the list below',
        keypress: function (e) {
            if (e.which === 13) {
                list('value', 'hogaya value change to: '+this.value);
                this.value = '';
            }
        }
    });

    $('body')
        .append(input)
        .append(input1)
        .append('<br />')
        .append(ul)
        .append(ul1);
})(this);