/**
 * @filename: Label
 * @author: schhetri
 * @date: 08/08/13
 * @time: 3:07 AM
 */
(function (W, U) {
    var Label = function (conf) {
        var label = ObserveProp({text: ''}),
            $el = $('<label/>'),
            html = '';

        $el.text(conf.text);

        label.getEl = function () {
            return $el;
        };
        label('text', function (v) {
            $el.text(v);
        });
        return label;
    };

    W.Label = Label;
})(this);