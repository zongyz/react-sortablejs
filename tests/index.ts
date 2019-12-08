import { Selector } from "testcafe";

fixture("Simple sorting")
  .page("http://localhost:1234/")

const list = Selector("#simple-list");

test("Sort down list by 1 space", async browser => {
  const dragStartPosition = list.child(0);
  const dragEl = await dragStartPosition();
  const dragEndPosition = list.child(1);

  const targetStartPosition = list.child(1);
  const target = await targetStartPosition();
  const targetEndPosition = list.child(0);

  await browser
    .expect(dragStartPosition.innerText)
    .eql(dragEl.innerText!)
    .expect(targetStartPosition.innerText)
    .eql(target.innerText!)
    .dragToElement(dragEl, target)
    .expect(dragEndPosition.innerText)
    .eql(dragEl.innerText!)
    .expect(targetEndPosition.innerText)
    .eql(target.innerText!);
});

test("Sort down list by 2 spaces", async browser => {
  const dragStartPosition = list.child(0);
  const dragEl = await dragStartPosition();
  const dragEndPosition = list.child(2);

  const targetStartPosition = list.child(2);
  const target = await targetStartPosition();
  const targetEndPosition = list.child(1);

  await browser
    .expect(dragStartPosition.innerText)
    .eql(dragEl.innerText!)
    .expect(targetStartPosition.innerText)
    .eql(target.innerText!)
    .dragToElement(dragEl, target)
    .expect(dragEndPosition.innerText)
    .eql(dragEl.innerText!)
    .expect(targetEndPosition.innerText)
    .eql(target.innerText!);
});

test("Sort down list by 3 spaces", async browser => {
  const dragStartPosition = list.child(0);
  const dragEl = await dragStartPosition();
  const dragEndPosition = list.child(3);

  const targetStartPosition = list.child(3);
  const target = await targetStartPosition();
  const targetEndPosition = list.child(2);

  await browser
    .expect(dragStartPosition.innerText)
    .eql(dragEl.innerText!)
    .expect(targetStartPosition.innerText)
    .eql(target.innerText!)
    .dragToElement(dragEl, target)
    .expect(dragEndPosition.innerText)
    .eql(dragEl.innerText!)
    .expect(targetEndPosition.innerText)
    .eql(target.innerText!);
});

test("Sort up list by 1 space", async browser => {
  const dragStartPosition = list.child(1);
  const dragEl = await dragStartPosition();
  const dragEndPosition = list.child(0);

  const targetStartPosition = list.child(0);
  const target = await targetStartPosition();
  const targetEndPosition = list.child(1);

  await browser
    .expect(dragStartPosition.innerText)
    .eql(dragEl.innerText!)
    .expect(targetStartPosition.innerText)
    .eql(target.innerText!)
    .dragToElement(dragEl, target)
    .expect(dragEndPosition.innerText)
    .eql(dragEl.innerText!)
    .expect(targetEndPosition.innerText)
    .eql(target.innerText!);
});

test("Sort up list by 2 spaces", async browser => {
  const dragStartPosition = list.child(2);
  const dragEl = await dragStartPosition();
  const dragEndPosition = list.child(0);

  const targetStartPosition = list.child(0);
  const target = await targetStartPosition();
  const targetEndPosition = list.child(1);

  await browser
    .expect(dragStartPosition.innerText)
    .eql(dragEl.innerText!)
    .expect(targetStartPosition.innerText)
    .eql(target.innerText!)
    .dragToElement(dragEl, target)
    .expect(dragEndPosition.innerText)
    .eql(dragEl.innerText!)
    .expect(targetEndPosition.innerText)
    .eql(target.innerText!);
});

test("Sort up list by 3 spaces", async browser => {
  const dragStartPosition = list.child(3);
  const dragEl = await dragStartPosition();
  const dragEndPosition = list.child(0);

  const targetStartPosition = list.child(0);
  const target = await targetStartPosition();
  const targetEndPosition = list.child(1);

  await browser
    .expect(dragStartPosition.innerText)
    .eql(dragEl.innerText!)
    .expect(targetStartPosition.innerText)
    .eql(target.innerText!)
    .dragToElement(dragEl, target)
    .expect(dragEndPosition.innerText)
    .eql(dragEl.innerText!)
    .expect(targetEndPosition.innerText)
    .eql(target.innerText!);
});

// test("Swap threshold", async browser => {
//   const dragStartPosition = list.child(0);
//   const dragEl = await dragStartPosition();
//   const dragEndPosition = list.child(1);
//   const targetStartPosition = list.child(1);
//   const target = await targetStartPosition();
//   const targetEndPosition = list.child(0);

//   await browser.eval(() => {
//     //@ts-ignore - doesn't exist on typeof sortable
//     Sortable.get(document.getElementById(LIST_NAME)).option(
//       "swapThreshold",
//       0.6
//     );
//   });

//   await browser
//     .expect(dragStartPosition.innerText)
//     .eql(dragEl.innerText!)
//     .expect(targetStartPosition.innerText)
//     .eql(target.innerText!)
//     .dragToElement(dragEl, target, {
//       destinationOffsetY: Math.round((itemHeight / 2) * 0.4 - leeway)
//     })
//     .expect(dragStartPosition.innerText)
//     .eql(dragEl.innerText!)
//     .expect(targetStartPosition.innerText)
//     .eql(target.innerText!)
//     .dragToElement(dragEl, target, {
//       destinationOffsetY: Math.round((itemHeight / 2) * 0.4 + leeway)
//     })
//     .expect(dragEndPosition.innerText)
//     .eql(dragEl.innerText!)
//     .expect(targetEndPosition.innerText)
//     .eql(target.innerText!);
// });

// test("Invert swap", async browser => {
//   const dragStartPosition = list.child(0);
//   const dragEl = await dragStartPosition();
//   const dragEndPosition = list.child(1);
//   const targetStartPosition = list.child(1);
//   const target = await targetStartPosition();
//   const targetEndPosition = list.child(0);

//   await browser.eval(() => {
//     //@ts-ignore - doesn't exist on typeof sortable
//     Sortable.get(document.getElementById(LIST_NAME)).option("invertSwap", true);
//   });

//   await browser
//     .expect(dragStartPosition.innerText)
//     .eql(dragEl.innerText!)
//     .expect(targetStartPosition.innerText)
//     .eql(target.innerText!)
//     .dragToElement(dragEl, target, {
//       destinationOffsetY: Math.round(itemHeight / 2 - leeway)
//     })
//     .expect(dragStartPosition.innerText)
//     .eql(dragEl.innerText!)
//     .expect(targetStartPosition.innerText)
//     .eql(target.innerText!)
//     .dragToElement(dragEl, target, {
//       destinationOffsetY: Math.round(itemHeight / 2 + leeway)
//     })
//     .expect(dragEndPosition.innerText)
//     .eql(dragEl.innerText!)
//     .expect(targetEndPosition.innerText)
//     .eql(target.innerText!);
// });

// test("Inverted swap threshold", async browser => {
//   const dragStartPosition = list.child(0);
//   const dragEl = await dragStartPosition();
//   const dragEndPosition = list.child(1);
//   const targetStartPosition = list.child(1);
//   const target = await targetStartPosition();
//   const targetEndPosition = list.child(0);

//   await browser.eval(() => {
//     //@ts-ignore - doesn't exist on typeof sortable
//     Sortable.get(document.getElementById(LIST_NAME)).option("invertSwap", true);
//     //@ts-ignore - doesn't exist on typeof sortable
//     Sortable.get(document.getElementById(LIST_NAME)).option(
//       "invertedSwapThreshold",
//       0.5
//     );
//   });

//   await browser
//     .expect(dragStartPosition.innerText)
//     .eql(dragEl.innerText!)
//     .expect(targetStartPosition.innerText)
//     .eql(target.innerText!)
//     .dragToElement(dragEl, target, {
//       destinationOffsetY: Math.round(
//         itemHeight - (itemHeight / 2) * 0.5 - leeway
//       )
//     })
//     .expect(dragStartPosition.innerText)
//     .eql(dragEl.innerText!)
//     .expect(targetStartPosition.innerText)
//     .eql(target.innerText!)
//     .dragToElement(dragEl, target, {
//       destinationOffsetY: Math.round(
//         itemHeight - (itemHeight / 2) * 0.5 + leeway
//       )
//     })
//     .expect(dragEndPosition.innerText)
//     .eql(dragEl.innerText!)
//     .expect(targetEndPosition.innerText)
//     .eql(target.innerText!);
// });
