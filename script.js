function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const feet = parseInt(document.getElementById('feet').value) || 0;
    const inches = parseInt(document.getElementById('inches').value) || 0;
    const gender = document.getElementById('gender').value;

    if (weight > 0 && (feet > 0 || inches > 0)) {
        const totalInches = (feet * 12) + inches;
        const heightInMeters = totalInches * 0.0254;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        const idealMin = (18.5 * (heightInMeters * heightInMeters)).toFixed(1);
        const idealMax = (24.9 * (heightInMeters * heightInMeters)).toFixed(1);

        const now = new Date();
        const dateStr = now.toLocaleDateString('bn-BD') + " | " + now.toLocaleTimeString('bn-BD');

        let status = "", color = "", dietHTML = "";

        if (bmi < 18.5) {
            status = "ওজন কম"; color = "#e67e22";
            dietHTML = gender === "male" 
                ? `<div class="diet-item">🥩 <b>খাবার:</b> প্রতিদিন ৩টি ডিম, মুরগির মাংস ও দুধ পান করুন।</div>
                   <div class="diet-item">🥔 <b>শাকসবজি:</b> ভাতের সাথে ঘি, মিষ্টি আলু ও পাকা কলা খান।</div>
                   <div class="diet-item">💧 <b>পানি:</b> প্রতিদিন ৩-৪ লিটার বিশুদ্ধ পানি পান নিশ্চিত করুন।</div>`
                : `<div class="diet-item">🥚 <b>খাবার:</b> আয়রন ও ক্যালসিয়ামের জন্য খেজুর, পনির ও দুধ খান।</div>
                   <div class="diet-item">🥦 <b>শাকসবজি:</b> পালং শাক, বিট ও গাজর বেশি করে খান।</div>
                   <div class="diet-item">💧 <b>পানি:</b> শরীর সতেজ রাখতে নিয়মিত পর্যাপ্ত পানি পান করুন।</div>`;
        } else if (bmi < 24.9) {
            status = "সঠিক ওজন"; color = "#27ae60";
            dietHTML = `
                <div class="diet-item">🥗 <b>শাকসবজি:</b> সব ধরনের মৌসুমি শাকসবজি ও ফলমূল নিয়মিত খান।</div>
                <div class="diet-item">💧 <b>পানি:</b> প্রতিদিন অন্তত ৮-১০ গ্লাস পানি পান করুন।</div>
                <div class="diet-item">🏃‍♂️ <b>টিপস:</b> ওজন ঠিক রাখতে নিয়মিত হাঁটাচলা বজায় রাখুন।</div>`;
        } else {
            status = "অতিরিক্ত ওজন"; color = "#c0392b";
            dietHTML = gender === "male"
                ? `<div class="diet-item">🥬 <b>শাকসবজি:</b> শসা, করলা, লাউ ও লেবু-পানি বেশি করে খান।</div>
                   <div class="diet-item">🚫 <b>বর্জন:</b> চিনি, মিষ্টি ও অতিরিক্ত তৈলাক্ত খাবার বাদ দিন।</div>
                   <div class="diet-item">💧 <b>পানি:</b> খাবার খাওয়ার ৩০ মিনিট আগে পানি পান করুন।</div>`
                : `<div class="diet-item">🥦 <b>শাকসবজি:</b> ভাতের বদলে সালাদ ও সবজি খাওয়ার পরিমাণ বাড়ান।</div>
                   <div class="diet-item">☕ <b>টিপস:</b> চিনি ছাড়া গ্রিন-টি পান করুন এবং মিষ্টি এড়িয়ে চলুন।</div>
                   <div class="diet-item">💧 <b>পানি:</b> শরীর থেকে টক্সিন বের করতে প্রচুর পানি পান করুন।</div>`;
        }

        document.getElementById('bmiResult').innerHTML = `
            <div id="bmiCapture" class="report-capture">
                <div class="report-head"><span>হেলথ রিপোর্ট</span><span>তারিখ: ${dateStr}</span></div>
                <div class="result-box" style="border-top: 5px solid ${color};">
                    <p style="margin:0; font-size:14px; color:#666;">BMI স্কোর</p>
                    <h1 style="color:${color}; margin: 5px 0;">${bmi}</h1>
                    <p>অবস্থা: <b>${status}</b></p>
                    <p style="font-size:13px; color:#555;">আদর্শ ওজন: ${idealMin} - ${idealMax} কেজি</p>
                </div>
                <h4 style="margin: 15px 0 5px; color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 5px;">📋 খাদ্য তালিকা ও পরামর্শ:</h4>
                ${dietHTML}
            </div>
            <button onclick="downloadImage('bmiCapture', 'Health_Report')" class="btn btn-download">📥 ডাউনলোড করুন</button>`;
    } else { alert("সঠিক ওজন ও উচ্চতা দিন!"); }
}

function calculateAge() {
    const birthValue = document.getElementById('birthdate').value;
    if (birthValue) {
        const birthDate = new Date(birthValue);
        const today = new Date();
        const dateStr = today.toLocaleDateString('bn-BD');

        let diffInMs = today - birthDate;
        
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();
        if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
        if (months < 0) { years--; months += 12; }

        let totalSeconds = Math.floor(diffInMs / 1000);
        let totalMinutes = Math.floor(totalSeconds / 60);
        let totalHours = Math.floor(totalMinutes / 60);
        
        document.getElementById('ageResult').innerHTML = `
            <div id="ageCapture" class="report-capture">
                <div class="report-head"><span>বয়স রিপোর্ট</span><span>তারিখ: ${dateStr}</span></div>
                <div class="result-box" style="border-top: 5px solid #3498db; padding: 25px 10px;">
                    <p style="margin:0; color:#666; font-size:14px;">আপনার বর্তমান বয়স</p>
                    <h2 style="color: #2980b9; margin: 10px 0; font-size: 24px;">${years} বছর, ${months} মাস, ${days} দিন</h2>
                    <div style="background: #eef2f7; padding: 10px; border-radius: 10px; margin-top: 10px;">
                        <p style="margin: 2px 0; color: #34495e; font-size: 14px;">মোট ঘণ্টা: <b>${totalHours.toLocaleString('bn-BD')}</b></p>
                        <p style="margin: 2px 0; color: #34495e; font-size: 14px;">মোট মিনিট: <b>${totalMinutes.toLocaleString('bn-BD')}</b></p>
                        <p style="margin: 2px 0; color: #34495e; font-size: 14px;">মোট সেকেন্ড: <b>${totalSeconds.toLocaleString('bn-BD')}</b></p>
                    </div>
                </div>
            </div>
            <button onclick="downloadImage('ageCapture', 'Age_Report')" class="btn btn-download">📥 ডাউনলোড করুন</button>`;
    } else { alert("জন্ম তারিখ সিলেক্ট করুন!"); }
}

function downloadImage(divId, fileName) {
    const element = document.getElementById(divId);
    html2canvas(element, { scale: 3 }).then(canvas => {
        const link = document.createElement('a');
        link.download = fileName + '.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}