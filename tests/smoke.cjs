const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const page=await browser.newPage({viewport:{width:900,height:850}});
 await page.addInitScript(()=>Math.random=()=>0.5);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route(/^https?:/,r=>r.abort());
 const url=name=>pathToFileURL(path.resolve(name)).href;
 const open=async id=>{await page.goto(url('games/play.html')+'?game='+id);await page.waitForTimeout(80)};
 const cell=i=>page.locator('.cell').nth(i);
 const status=()=>page.locator('#status').innerText();
 await page.goto(url('index.html'));assert.equal(await page.locator('.card').count(),8);
 await page.getByRole('button',{name:'Play together',exact:true}).click();assert.equal(await page.locator('.card').count(),4);
 await open('connect');assert.equal(await page.locator('.cell').count(),42);
 await page.locator('select').selectOption('duo');
 for(const c of [0,1,0,1,0,1,0])await cell(c).click();assert.match(await status(),/Red wins/);
 await page.getByRole('button',{name:'Restart',exact:true}).click();assert.match(await status(),/Red to play/);
 await page.locator('select').selectOption('solo');await cell(3).click();await page.waitForTimeout(450);assert.equal(await page.locator('.cell.red').count(),1);assert.equal(await page.locator('.cell.yellow').count(),1);
 await open('mines');await cell(40).click();assert.doesNotMatch(await status(),/Mine hit/);assert.ok(await page.locator('.cell.open').count()>0);await cell(0).click({button:'right'});
 await open('memory');
 const deck=['🍋','🍇','🍒','🥝','🍉','🍓','🍊','🍍'].flatMap(x=>[x,x]);
 for(let i=deck.length-1;i>0;i--){const j=Math.floor(.5*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]]}
 for(const symbol of new Set(deck)){const indices=deck.map((x,i)=>x===symbol?i:-1).filter(i=>i>=0);await cell(indices[0]).click();await cell(indices[1]).click()}
 assert.match(await status(),/All pairs found in 8 attempts/);
 // Ensure reset invalidates the pending flip timeout.
 await page.getByRole('button',{name:'Restart',exact:true}).click();await cell(0).click();await cell(1).click();await page.getByRole('button',{name:'Restart',exact:true}).click();await page.waitForTimeout(900);assert.equal(await page.locator('.cell.green').count(),0);
 await open('sokoban');await page.keyboard.press('ArrowLeft');assert.match(await status(),/Room solved/);await page.getByRole('button',{name:'Undo',exact:true}).click();assert.doesNotMatch(await status(),/Room solved/);await page.keyboard.press('ArrowLeft');await page.getByRole('button',{name:'Next level',exact:true}).click();assert.match(await page.locator('#stats').innerText(),/Room 2/);
 await open('reversi');assert.equal(await page.locator('.cell.black').count(),2);await cell(19).click();await page.waitForTimeout(500);assert.equal(await page.locator('.cell.black,.cell.white').count(),6);
 for(const id of ['breakout','golf','trails']){await open(id);assert.equal(await page.locator('canvas').count(),1);await page.waitForTimeout(200);await page.getByRole('button',{name:'Restart',exact:true}).click()}
 await open('golf');const rect=await page.locator('canvas').boundingBox();const x=rect.x+70*rect.width/640,y=rect.y+340*rect.height/420;await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x-35,y+25);await page.mouse.up();await page.waitForTimeout(150);assert.match(await page.locator('#stats').innerText(),/Strokes 1/);
 await open('trails');await page.getByRole('button',{name:'Start / pause',exact:true}).click();await page.waitForTimeout(1600);assert.match(await status(),/draw/);
 await page.setViewportSize({width:420,height:580});await page.goto(url('index.html'));await page.locator('.card').last().scrollIntoViewIfNeeded();assert.ok(await page.locator('.card').last().isVisible());await page.evaluate(()=>document.querySelector('main').scrollTop=0);await page.screenshot({path:'tests/launcher.png',fullPage:true});
 await open('connect');await page.screenshot({path:'tests/connect-four.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('PASS: all eight games load offline; filters, turns, wins, AI, first-click safety, undo and restart checks pass.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
