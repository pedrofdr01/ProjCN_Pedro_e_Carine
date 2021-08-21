var x5 = 0;
var x4 = 0;
var x3 = 0;
var x2 = 0;
var x = 0;
var n = 0;
var epsilon = 0;
var interval = [];
var interval_initial = [];
var func = "";

$(document).ready(function () {
    $("#btn-calc").click(function () {
        initialize(); // Define os valores de acordo com o formulário
        defineInterval(); // Define o intervalo
        bisection(); // Realiza o cálculo

        // Imprime o gráfico
        let width = 500;
        let height = 250;
        functionPlot({
            target: "#output_info_graph",
            width,
            height,
            yAxis: {
                domain: [-6, 6]
            },
            grid: true,
            data: [{
                fn: func
            }]
        });
    });
});

/**
 * Realiza o cálculo
 */
function bisection() {
    $("#output").html("");
    var loop = 0;
    var keep_going = true;
    var a = interval[0];
    var b = interval[1];
    while (keep_going) {
        var f_a = calc(a);
        var f_b = calc(b);
        var x_bisec = (b + a) / 2;
        var f_x_bisec = calc(x_bisec);

        if (f_x_bisec == 0 || (b - a) < epsilon) {
            var html = ``;
            html += `<p class="mb-0"><b>Função:</b> ${func}</p>`;
            html += `<p class="mb-0"><b>Intervalo:</b> [${interval_initial[0]}, ${interval_initial[1]}]</p>`;
            html += `<p class="mb-0"><b>Raiz:</b> ${x_bisec.toFixed(4)}</p>`;
            html += `<p class="mb-0"><b>Erro:</b> (b - a) < ε</p>`;
            html += `<p class="mb-0"><b>Número de Iterações:</b> ${loop}</p>`;
            $("#output_info").html(html);
            keep_going = false;
            break;
        }

        var html = ``;
        html += `<tr>`;
        html += `    <td>${loop}</td>`;
        html += `    <td>${a.toFixed(4)}</td>`;
        html += `    <td>${f_a.toFixed(4)}</td>`;
        html += `    <td>${b.toFixed(4)}</td>`;
        html += `    <td>${f_b.toFixed(4)}</td>`;
        html += `    <td>${x_bisec.toFixed(4)}</td>`;
        html += `    <td>${f_x_bisec.toFixed(4)}</td>`;
        html += `</tr>`;
        $("#output").append(html);

        a = ((f_a > 0 && f_x_bisec > 0) || (f_a < 0 && f_x_bisec < 0)) ? x_bisec : a;
        b = ((f_b > 0 && f_x_bisec > 0) || (f_b < 0 && f_x_bisec < 0)) ? x_bisec : b;

        loop++;
    };
}

/**
 * Calcula a função
 * @param value_x valor de X 
 * @returns 
 */
function calc(value_x) {
    var res = (x5 * Math.pow(value_x, 5) + x4 * Math.pow(value_x, 4) + x3 * Math.pow(value_x, 3) + x2 * Math.pow(value_x, 2) + x * value_x + n);
    return res;
}

/**
 * Define o intervalo
 */
function defineInterval() {
    var results = [];
    for (var i = -10; i <= 10; i++) {
        var obj = {
            index: i,
            result: calc(i),
        }
        results.push(obj);
    }

    var last = results[0].result;
    for (i = 1; i < results.length; i++)
        if ((last * results[i].result) <= 0) {
            interval.push(results[i].index)
            interval_initial.push(results[i].index)
            last = results[i].result
        }

}

/**
 * Define os valores de acordo com o formulário
 */
function initialize() {
    x5 = 0;
    x4 = 0;
    x3 = 0;
    x2 = 0;
    x = 0;
    n = 0;
    epsilon = 0;
    interval = [];
    interval_initial = [];
    func = "";

    if ($("#function_x5").val() != "")
        x5 = parseFloat($("#function_x5").val());

    if ($("#function_x4").val() != "")
        x4 = parseFloat($("#function_x4").val());

    if ($("#function_x3").val() != "")
        x3 = parseFloat($("#function_x3").val());

    if ($("#function_x2").val() != "")
        x2 = parseFloat($("#function_x2").val());

    if ($("#function_x").val() != "")
        x = parseFloat($("#function_x").val());

    if ($("#function_n").val() != "")
        n = parseFloat($("#function_n").val());

    if ($("#epsilon").val() != "")
        epsilon = parseFloat($("#epsilon").val());

    if (x5 != 0)
        func += `${x5 != 1 ? x5+"*" : ""}x^5`;

    if (x4 != 0)
        func += (func == "" ? "" : (x4 < 0 ? "" : "+")) + `${x4 != 1 ? x4+"*" : ""}x^4`;

    if (x3 != 0)
        func += (func == "" ? "" : (x3 < 0 ? "" : "+")) + `${x3 != 1 ? x3+"*" : ""}x^3`;

    if (x2 != 0)
        func += (func == "" ? "" : (x2 < 0 ? "" : "+")) + `${x2 != 1 ? x2+"*" : ""}x^2`;

    if (x != 0)
        func += (func == "" ? "" : (x < 0 ? "" : "+")) + `${x != 1 ? x+"*" : ""}x`;

    if (n != 0)
        func += (func == "" ? "" : (n < 0 ? "" : "+")) + `${n != 1 ? n : ""}`;
}