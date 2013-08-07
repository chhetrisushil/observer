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
        input, input1, select, label, label1;

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

    select = Select([
        {
            text: 'One',
            value: 1
        },
        {
            text: 'Two',
            value: 2
        }
    ]);

    label = Label({text: 'No Value'});
    label1 = Label({text: 'No Value 1'});

    select('value', label.text);
    select('value', function (v) {
        v = 'appending text'+v;
        label1.text(v);
    });

    $('body')
        .append(input)
        .append(input1)
        .append('<br />')
        .append(ul)
        .append(ul1)
        .append('<br />')
        .append(select.getEl())
        .append('<br />')
        .append(label.getEl())
        .append('<br />')
        .append(label1.getEl());
})(this);