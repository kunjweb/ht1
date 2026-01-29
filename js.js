const database = {
    'home': [
        { name: 'Getting Started', info: '<h1>Arduino Encyclopedia</h1><p>This is a complete offline resource for <b>Arduino</b> and <b>ESP32</b> development.</p><h3>Key Features:</h3><ul><li>Full pinout specs for Uno, Mega, and ESP32.</li><li>Comprehensive function reference.</li><li>Sensor wiring guides.</li></ul>' }
    ],
    'boards': [
        { name: 'Arduino Uno R3', info: '<h1>Uno R3 Specs</h1><p><b>Microcontroller:</b> ATmega328P</p><ul><li><b>Voltage:</b> 5V</li><li><b>Digital I/O:</b> 14 (6 PWM)</li><li><b>Analog In:</b> 6</li><li><b>Flash:</b> 32 KB</li></ul>' },
        { name: 'Arduino Mega 2560', info: '<h1>Mega 2560</h1><p>Best for high I/O projects.</p><ul><li><b>Digital I/O:</b> 54 pins</li><li><b>Analog In:</b> 16 pins</li><li><b>UARTs:</b> 4 Hardware Ports</li></ul>' },
        { name: 'Arduino Nano Every', info: '<h1>Nano Every</h1><p>Compact, breadboard-friendly.</p><ul><li><b>Processor:</b> ATMega4809</li><li><b>RAM:</b> 6KB (3x more than Uno)</li></ul>' }
    ],
    'esp32': [
        { name: 'ESP-WROOM-32', info: '<h1>ESP32 Technical Specs</h1><ul><li><b>CPU:</b> Dual-core Xtensa® 32-bit LX6</li><li><b>WiFi:</b> 802.11 b/g/n</li><li><b>Bluetooth:</b> v4.2 + BLE</li><li><b>SRAM:</b> 520 KB</li><li><b>ADC:</b> 12-bit (18 channels)</li></ul>' },
        { name: 'ESP32 WiFi API', info: '<h1>WiFi.begin()</h1><p>Connects ESP32 to a router.</p><code>#include &lt;WiFi.h&gt;<br>WiFi.begin("SSID", "Password");</code>' },
        { name: 'Deep Sleep Mode', info: '<h1>Deep Sleep</h1><p>Used to save power. Current drops to ~10µA.</p><code>esp_deep_sleep_start();</code>' }
    ],
    'functions': [
        { name: 'pinMode()', info: '<h1>pinMode()</h1><p>Sets a pin as INPUT or OUTPUT.</p><code>pinMode(13, OUTPUT);</code>' },
        { name: 'analogRead()', info: '<h1>analogRead()</h1><p>Reads voltage (0-5V) as a value (0-1023).</p>' },
        { name: 'attachInterrupt()', info: '<h1>attachInterrupt()</h1><p>Triggers code instantly when a pin state changes.</p>' }
    ],
    'sensors': [
        { name: 'DHT11 / DHT22', info: '<h1>Temp & Humidity</h1><p>Digital sensor. Requires DHT library.</p><code>float h = dht.readHumidity();</code>' },
        { name: 'HC-SR04 Ultrasonic', info: '<h1>Distance Sensor</h1><p>Uses sound waves to measure distance. Requires a Trigger and Echo pin.</p>' }
    ]
};

let currentCategory = 'home';

function loadTopic(category) {
    currentCategory = category;
    const list = document.getElementById('sidebar-list');
    const btns = document.querySelectorAll('.nav-btn');
    
    btns.forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase().includes(category.substring(0,3))) btn.classList.add('active');
    });

    list.innerHTML = '';
    database[category].forEach((item, index) => {
        let li = document.createElement('li');
        li.innerText = item.name;
        li.onclick = () => document.getElementById('content-display').innerHTML = item.info;
        list.appendChild(li);
    });
}

function searchDatabase() {
    const term = document.getElementById('search-input').value.toLowerCase();
    const list = document.getElementById('sidebar-list');
    list.innerHTML = '';
    
    Object.keys(database).forEach(cat => {
        database[cat].forEach(item => {
            if(item.name.toLowerCase().includes(term)) {
                let li = document.createElement('li');
                li.innerHTML = `<small style="color:gray">${cat}:</small> ${item.name}`;
                li.onclick = () => document.getElementById('content-display').innerHTML = item.info;
                list.appendChild(li);
            }
        });
    });
}

window.onload = () => loadTopic('home');
