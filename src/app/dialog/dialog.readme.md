# minSpacingWithContainer

Minimum space between dialog borders (top/right/bottom/left) and its parent.

## Height small and width small

```console
┌─────────────────────────────────────────────┬─
│                                             │ top spacing
│            ┌───────────────────┐            ├─
│            │ Header            │            │
│            ├───────────────────┤            │
│            │ Content           │            │
│            │                   │            │
│            │                   │            │
│            ├───────────────────┤            │
│            │ Footer            │            │
│            └───────────────────┘            ├─
│                                             │
│                                             │
│                                             │ bottom spacing
│                                             │
│                                             │
└────────────┬────────────────────┬───────────┴─
left spacing                      right spacing
```

## Height small and width big

```console
┌─────────────────────────────────────────────┬─
│                                             │ top spacing
│      ┌───────────────────────────────┐      ├─
│      │ Header                        │      │
│      ├───────────────────────────────┤      │
│      │ Content                       │      │
│      │                               │      │
│      │                               │      │
│      ├───────────────────────────────┤      │
│      │ Footer                        │      │
│      └───────────────────────────────┘      ├─
│                                             │
│                                             │
│                                             │ bottom spacing
│                                             │
│                                             │
└──────┬───────────────────────────────┬──────┴─
left spacing                           right spacing
```

## Height big and width big

```console
┌─────────────────────────────────────────────┬─
│                                             │ top spacing
│      ┌───────────────────────────────┐      ├─
│      │ Header                        │      │
│      ├───────────────────────────────┤      │
│      │ Content                       │      │
│      │                               │      │
│      │                               │      │
│      │                               │      │
│      │                               │      │
│      │                               │      │
│      │                               │      │
│      ├───────────────────────────────┤      │
│      │ Footer                        │      │
│      └───────────────────────────────┘      ├─
│                                             │ bottom spacing
└──────┬───────────────────────────────┬──────┴─
left spacing                           right spacing

```

## Height big and width small

```console
┌─────────────────────────────────────────────┬─
│                                             │ top spacing
│            ┌───────────────────┐            ├─
│            │ Header            │            │
│            ├───────────────────┤            │
│            │ Content           │            │
│            │                   │            │
│            │                   │            │
│            │                   │            │
│            │                   │            │
│            │                   │            │
│            │                   │            │
│            ├───────────────────┤            │
│            │ Footer            │            │
│            └───────────────────┘            ├─
│                                             │ bottom spacing
└────────────┬───────────────────┬────────────┴─
left spacing                     right spacing
```

https://www.w3schools.com/charsets/ref_utf_box.asp

## spacing behaviour

To sum up:

- top spacing: always exactly equal to `minSpacingWithContainer`
- bottom spacing: fluid between `minSpacingWithContainer` and remaining space
- right and left spacing: fluid between `minSpacingWithContainer` and remaining space / 2
