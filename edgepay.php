<?php
// edgepay.edgevervebs.org/index.php

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EdgePay – Contactless Payments & QR Ordering</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <div class="logo">
            <img src="images/edgepay-logo.png" alt="EdgePay Logo">
            <h1>EdgePay</h1>
        </div>
        <nav>
            <ul>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#get-started">Get Started</a></li>
                <li><a href="https://portal.edgevervebs.org/onboarding.php" class="btn">Organization Login</a></li>
            </ul>
        </nav>
    </header>

    <section id="hero">
        <div class="hero-content">
            <h2>Scan. Order. Pay. Done.</h2>
            <p>EdgePay makes it easy for restaurants, schools, NGOs, and organizations to onboard, create products/services, and accept payments with a QR code – no app required.</p>
            <a href="https://portal.edgevervebs.org/onboarding.php" class="btn">Get Started</a>
        </div>
    </section>

    <section id="how-it-works">
        <h2>How EdgePay Works</h2>
        <ol>
            <li>Organizations onboard and submit KYC</li>
            <li>Admin creates products/services in the portal</li>
            <li>QR codes are generated for customers</li>
            <li>Customers scan QR, place order, and pay</li>
            <li>Admin receives notifications and manages orders</li>
        </ol>
    </section>

    <section id="features">
        <h2>Features</h2>
        <ul>
            <li>Multi-category organizations: Restaurants, Schools, NGOs, Retail</li>
            <li>Dynamic forms per category for products/services</li>
            <li>Seat Number / Customer Identifier tracking</li>
            <li>Secure payment and receipt with unique reference</li>
            <li>Real-time admin notifications</li>
            <li>Cloudflare Bot Detection ready</li>
        </ul>
    </section>

    <section id="get-started">
        <h2>Get Started</h2>
        <p>Organizations can easily register, submit KYC, and start accepting payments with QR codes in minutes.</p>
        <a href="https://portal.edgevervebs.org/onboarding.php" class="btn">Register Now</a>
    </section>

    <footer>
        <p>&copy; <?= date('Y'); ?> EdgePay by EdgeVerveBS. All rights reserved.</p>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
