const ARDUINO_DATA = {
    "Introduction": {
        "What is Arduino?": {
            intro: "Arduino is an open-source electronics platform based on easy-to-use hardware and software. Arduino boards are able to read inputs - light on a sensor, a finger on a button, or a Twitter message - and turn it into an output - activating a motor, turning on an LED, publishing something online.",
            details: "It was born at the Ivrea Interaction Design Institute as an easy tool for fast prototyping, aimed at students without a background in electronics and programming. Since then, it has powered thousands of projects, from everyday objects to complex scientific instruments."
        }
    },
    "Boards": {
        "Arduino Uno R3": {
            intro: "The Uno is the most used and documented board in the entire Arduino family. It is based on the ATmega328P.",
            specs: ["Microcontroller: ATmega328P", "Operating Voltage: 5V", "Digital I/O Pins: 14", "Flash Memory: 32 KB"],
            pinout: "https://docs.arduino.cc"
        },
        "Arduino Mega 2560": {
            intro: "Designed for more complex projects. With 54 digital I/O pins, 16 analog inputs and a larger space for your sketch it is the recommended board for 3D printers and robotics projects.",
            specs: ["Microcontroller: ATmega2560", "Flash Memory: 256 KB", "SRAM: 8 KB"]
        }
    },
    "Programming": {
        "DigitalWrite": {
            intro: "The digitalWrite() function is used to write a HIGH or a LOW value to a digital pin.",
            code: "void setup() {\n  pinMode(13, OUTPUT); // Sets pin 13 as output\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH); // Turn LED ON\n  delay(1000);\n  digitalWrite(13, LOW); // Turn LED OFF\n  delay(1000);\n}"
        }
    }
};

function init() {
    const menu = document.getElementById('nav-menu');
    for (let cat in ARDUINO_DATA) {
        let html = `<h3>${cat}</h3><ul>`;
        for (let item in ARDUINO_DATA[cat]) {
            html += `<li onclick="render('${cat}', '${item}')">${item}</li>`;
        }
        html += `</ul>`;
        menu.innerHTML += html;
    }
}

function render(cat, item) {
    const data = ARDUINO_DATA[cat][item];
    const display = document.getElementById('display-window');
    
    let specHtml = data.specs ? `<h4>Technical Specs:</h4><ul>${data.specs.map(s => `<li>${s}</li>`).join('')}</ul>` : '';
    let codeHtml = data.code ? `<h4>Example Code:</h4><pre><code>${data.code}</code></pre>` : '';

    display.innerHTML = `
        <div class="card">
            <h1>${item}</h1>
            <p>${data.intro}</p>
            ${data.details ? `<p>${data.details}</p>` : ''}
            ${specHtml}
            ${codeHtml}
        </div>
    `;
}

init();
