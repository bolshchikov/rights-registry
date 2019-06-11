package main

import (
	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1"
)

var PUBLIC = sdk.Export(register, get)
var SYSTEM = sdk.Export(_init)

func _init() {

}

func register(id uint64, record string) {
}

func get(id uint64) string {

}
