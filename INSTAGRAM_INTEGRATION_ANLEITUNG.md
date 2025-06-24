# Instagram Posts Integration - Anleitung

## 🎯 So ersetzt du die Mockup-Bilder mit echten Instagram Posts:

### Schritt 1: Instagram Posts auswählen
1. Gehe zu: https://www.instagram.com/barber_shop_bs/
2. Wähle 6 deiner besten/neuesten Posts aus

### Schritt 2: Embed-Code erhalten
Für jeden Post:
1. Klicke auf den Post
2. Klicke auf die drei Punkte (⋯) oben rechts
3. Wähle "Einbetten"
4. Kopiere den HTML-Code

### Schritt 3: Code ersetzen
Ersetze in der `index.html` die Beispiel-URLs:

**VORHER:**
```html
<div class="instagram-post" data-post-url="https://www.instagram.com/p/BEISPIEL1/">
```

**NACHHER:**
```html
<div class="instagram-post" data-post-url="https://www.instagram.com/p/ECHTER_POST_CODE/">
```

### Beispiel für echten Instagram Post:
```html
<!-- Post 1 - Ersetze BEISPIEL1 mit echtem Post-Code -->
<div class="instagram-post" data-post-url="https://www.instagram.com/p/C8xYz123456/">
    <blockquote class="instagram-media" 
                data-instgrm-captioned 
                data-instgrm-permalink="https://www.instagram.com/p/C8xYz123456/" 
                data-instgrm-version="14">
        <div class="instagram-placeholder">
            <img src="Bilder/webp/Nachher.webp" alt="Instagram Post - Premium Haarschnitt" loading="lazy">
            <div class="post-overlay">
                <i class="fab fa-instagram"></i>
                <span>Auf Instagram ansehen</span>
            </div>
        </div>
    </blockquote>
</div>
```

### Schritt 4: Post-URLs finden
Der Post-Code findest du in der Instagram-URL:
- **URL:** `https://www.instagram.com/p/C8xYz123456/`
- **Code:** `C8xYz123456`

### Schritt 5: Optional - Bilder aktualisieren
Du kannst auch die Placeholder-Bilder durch Screenshots der echten Posts ersetzen:
1. Screenshot vom Instagram Post machen
2. Als .webp speichern in `Bilder/webp/`
3. Pfad in der `<img src="...">` aktualisieren

## 🚀 Automatische Alternative:

### Instagram Basic Display API (Fortgeschritten)
Für automatische Updates der Posts:
1. Instagram Business Account erstellen
2. Facebook Developer Account
3. Instagram Basic Display API einrichten
4. JavaScript Code für automatischen Feed

## 📝 Aktuell zu ersetzende Placeholder:
- BEISPIEL1 → Echter Post-Code
- BEISPIEL2 → Echter Post-Code  
- BEISPIEL3 → Echter Post-Code
- BEISPIEL4 → Echter Post-Code
- BEISPIEL5 → Echter Post-Code
- BEISPIEL6 → Echter Post-Code

## ✅ Nach der Aktualisierung:
- Alle Posts führen zu echten Instagram Posts
- Automatisches Instagram Embed-Widget
- Bessere SEO und Social Media Integration
