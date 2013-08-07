/**
 * @filename: Select
 * @author: schhetri
 * @date: 08/08/13
 * @time: 3:07 AM
 */
(function (W, U) {
    var Select = function (conf) {
        var select = ObserveProp({value: ''}),
            $el = $('<select/>'),
            html = '';

        conf.forEach(function (option) {
            html += '<option value="' + option.value + '">' + option.text + '</option>';
        });

        $el.html(html);

        select.getEl = function () {
            return $el;
        };

        $el.on('change', function () {
            select.value(this.value);
        });

        return select;
    };

    W.Select = Select;
})(this);