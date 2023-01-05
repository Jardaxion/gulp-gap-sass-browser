# gulp-gap-sass-browser
Starter gulp packages for static web-sites with pug, scss, ts
### Content
1. Starting
2. Commands
3. Mixins
4. Plugins
### Starting
1. Copy gulp template from git
```
git clone https://github.com/Jardaxion/gulp-gap-sass-browser.git .
```
2. Install all npm dependencies
```
npm install
```
or
```
npm i
```
3. Start gulp project
```
gulp
```
4. At the end of the project, move the files in the deploy folder "dist"
```
gulp build
```
### All start commands
```
git clone https://github.com/Jardaxion/gulp-gap-sass-browser.git .
npm install
gulp
```
or
```
git clone https://github.com/Jardaxion/gulp-gap-sass-browser.git .
npm install
```
The rest of the commands can be seen below
### Commands
gulp - start liveserver <br>
gulp build - build project in dist <br>
gulp minBuild - build project in minDist with only minification files(min js and min css) + minification html <br>
gulp zipBuild - archive build project in zip file
# Mixins
## SCSS
More detailed documentation and variable names can be found in the mixin files themselves(scss/scssOnly/mixins)
### Mixins for position absolute
1. backgroundImage - mixin for create img bg if img in html
2. onAb - some on top of somethig; takes an argument in the form z-index(just number)
3. absoluteCenter - horisontal and vertical center for absolute
4. horCenterAbsol - horisontal center for absolute
5. verCenterAbsol - vertical center for absolute
6. TLa - top left abosulte; takes an argument in the form top(initially equal to 0) and left(initially equal to 0)
7. TRa - top right absolute; the same as with TLa
8. BLa - bottom left absolute; the same as with TLa
9. BRa - bottom right absolute; the same as with TLa
10. LRea - Left and right element positioning left and right absolute;  argument in the form: class name for left element, px left, class name for right element and px right
### Mixin for flex
1. flex center - justify center and align-items center
2. columns(Use on a div that will have columns) - External column; argument in the form: align-item(initially equal to center)
3. column - The column itself; argument in the form: number of column(initially equal to 3); The number of columns is needed in order to divide 100% by it
4. nav - Navbar with indented; argument in the form: class name - for margin-right a link(initially equal 'a'), margin right(initially equal 0)
### Freqeuent mixins
1. font - mixin for font; argument in the form: fontSize(initially equal to 16px), fontFamily(initially equal to '', if = '' then not use), color(initially equal to black), lineHeight(initially equal to 0, if = 0 then not use), fontWeight(initially equal to 0, if = 0 then not use)
2. box - mixin for create box and rounded them; argument in the form: px - size of box; rounded - border-radius(initially equal to 0)
3. transition - mixin for my standart: ease .3s all; argument in the form: type animation(initially equal to ease);
### Mixins for display grid
1. grid - display grid; argument in the form: gtc - number of colums(initially equal to 1), gtcw - size of one column(initially equal to 1fr), gap - gap(initially equal to 0), gtr - number of lines(optional parameter, initially equal to 0, if = 0 then not use)
2. grudCol - grid item; colStar - column start; colEnd - column end; rowStart - row start; rowEnd - row end;
### Mixins for margin
1. mVC - vertical margin center
2. mHC - horisontal margin center
3. mC - margin center
### Mixins for UI
Large material, which is not used anywhere, it is better to read about it inside the files
## Pug
title - mixin for create title(p tag); argument in the form: title - title text, className - class for Bam(add '__title' in end)
# Plugins
### Conventers
gulp-sass - conventer scss <br>
gulp-gup - conveter pug <br>
gulp-typescript - conveter typescript
### Plugins for files
gulp-concat - concat files <br>
gulp-uglify-es - minification files <br>
gulp-sourcemaps - sourcemaps <br>
gulp-htmlmin - minification html <br>
gulp-csscomb - beatifule css
### Browser
gulp-autoprefixer - crossbrowser for css <br>
browser-sync - liveserver and reload on rewrite files
### Another
gulp-plumber - normal error in console <br>
gulp-notify - error in OS alert <br>
gulp-zip - archive files
